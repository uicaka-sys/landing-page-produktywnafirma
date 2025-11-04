<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Metoda niedozwolona.']);
    exit;
}

function clean_string($str) {
    $str = trim($str);
    $str = str_replace(["\r", "\n"], ' ', $str);
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name  = isset($_POST['name'])  ? clean_string($_POST['name'])  : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? clean_string($_POST['phone']) : '';
$area  = isset($_POST['area'])  ? clean_string($_POST['area'])  : '';

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Brak wymaganych danych.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowy adres e-mail.']);
    exit;
}

$to      = 'andrzej.kalkowski@produktywnafirma.pl';
$subject = 'Nowe zgłoszenie z formularza ProduktywnaFirma.pl';
$subject = str_replace(["\r", "\n"], '', $subject);

$timestamp = date('Y-m-d H:i:s');

$htmlMessage = '<html><body style="font-family: Arial, sans-serif; font-size:14px; color:#1F2933;">';
$htmlMessage .= '<h2 style="color:#0E325B;">Nowe zgłoszenie z formularza ProduktywnaFirma.pl</h2>';
$htmlMessage .= '<p>Poniżej znajdują się szczegóły zgłoszenia:</p>';
$htmlMessage .= '<table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">';
$htmlMessage .= '<tr><td style="font-weight:bold;">Imię i nazwisko:</td><td>' . $name . '</td></tr>';
$htmlMessage .= '<tr><td style="font-weight:bold;">E-mail:</td><td>' . $email . '</td></tr>';
$htmlMessage .= '<tr><td style="font-weight:bold;">Telefon:</td><td>' . $phone . '</td></tr>';
$htmlMessage .= '<tr><td style="font-weight:bold;">Obszar współpracy:</td><td>' . $area . '</td></tr>';
$htmlMessage .= '<tr><td style="font-weight:bold;">Data zgłoszenia:</td><td>' . $timestamp . '</td></tr>';
$htmlMessage .= '</table>';
$htmlMessage .= '<br><hr style="border:none;border-top:1px solid #E5E7EB;">';
$htmlMessage .= '<p style="font-size:12px;color:#6B7280;">Ta wiadomość została wygenerowana automatycznie z formularza na stronie <strong>ProduktywnaFirma.pl</strong>.</p>';
$htmlMessage .= '</body></html>';

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Produktywna Firma <no-reply@produktywnafirma.pl>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($to, $subject, $htmlMessage, implode("\r\n", $headers));

$logDir  = __DIR__ . '/logs';
$logFile = $logDir . '/form_log.txt';

if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}

$logLine = sprintf(
    "[%s] %s | %s | %s | %s\n",
    $timestamp,
    $name,
    $email,
    $phone,
    $area
);
@file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

if ($mailSent) {
    echo json_encode(['status' => 'ok']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się wysłać wiadomości.']);
}
