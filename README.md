Landing page: Produktywna Firma – v8 z backendem PHP
====================================================

Ta wersja zawiera:
- tekstowy logotyp "Produktywna / Firma" w nagłówku,
- logo SVG w sekcji HERO nad hasłem "Zwiększam Zwrot z Każdej Złotówki (ROI)...",
  w białym boxie z cieniem,
- szerokość logo ograniczoną do 70% szerokości kolumny tekstowej (wyśrodkowane),
- animacje fade-in sekcji HERO, logo i formularza,
- delikatny "glow" na przycisku CTA w HERO przy najechaniu,
- zdjęcie Andrzeja w sekcji "O Mnie" (max szerokość 280 px),
- poprawione zdanie: "Nazywam się Andrzej Kalkowski i współpracuję z liderami,
  którzy chcą zamienić chaos w skalowalny biznes.",
- favicon na bazie zoptymalizowanego logo SVG,
- działający backend PHP do obsługi formularza kontaktowego.

Backend PHP:
------------
Plik: send_mail.php

Funkcje:
- odbiera dane z formularza (name, email, phone, area),
- waliduje je i zabezpiecza przed prostymi atakami,
- wysyła HTML-ową wiadomość e-mail na adres:
  andrzej.kalkowski@produktywnafirma.pl
  z tematem: "Nowe zgłoszenie z formularza ProduktywnaFirma.pl",
- zapisuje kopię zgłoszenia w pliku logs/form_log.txt
  w formacie: [YYYY-MM-DD HH:MM:SS] Imię | E-mail | Telefon | Obszar,
- zwraca JSON: {"status":"ok"} lub {"status":"error", "message":"..."}.

Frontend (script.js):
---------------------
- Przechwytuje wysłanie formularza,
- wysyła dane metodą POST (AJAX) do send_mail.php,
- w przypadku sukcesu:
  - pokazuje komunikat "Dziękuję za zgłoszenie. Odezwię się w ciągu 24 godzin.",
  - czyści formularz,
- w przypadku błędu:
  - wyświetla komunikat alertu,
  - przywraca stan przycisku.

Instrukcja wdrożenia na OVH (hosting WWW z PHP):
------------------------------------------------
1. Zaloguj się do panelu OVH.
2. Wejdź w zakładkę "Hosting" i wybierz swój hosting.
3. Otwórz "FTP" / "FTP Explorer" (lub połącz się klientem FTP, np. FileZilla).
4. Wejdź do katalogu głównego strony (najczęściej: /www/ lub /public_html/).
5. Wgraj WSZYSTKIE pliki z tego archiwum:
   - index.html
   - styles.css
   - script.js
   - send_mail.php
   - andrzej-kalkowski.jpg
   - logo_produktywna_firma.svg
   - favicon.svg
   - README.txt
6. Upewnij się, że katalog "logs" będzie miał uprawnienia do zapisu.
   Jeśli go nie ma – skrypt send_mail.php utworzy go automatycznie.
7. Wejdź na adres swojej strony (np. https://produktywnafirma.pl)
   i przetestuj formularz:
   - wypełnij dane,
   - wyślij,
   - sprawdź, czy:
     * pojawił się komunikat o sukcesie,
     * dotarł e-mail na skrzynkę,
     * w katalogu /logs/ pojawił się plik form_log.txt z wpisem.

Uwaga dot. wysyłki maili:
-------------------------
- Funkcja mail() może być filtrowana przez antyspam.
- Aby zwiększyć dostarczalność:
  - zadbaj o poprawne rekordy SPF / DKIM / DMARC dla domeny
    produktywnafirma.pl,
  - rozważ użycie konta e-mail na tym samym hostingu
    jako nadawcy (no-reply@produktywnafirma.pl).

