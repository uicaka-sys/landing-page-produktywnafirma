document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const form = document.getElementById("contact-form");
    const success = document.getElementById("form-success");
    const submitBtn = form ? form.querySelector("button[type='submit']") : null;

    if (form && success && submitBtn) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            success.hidden = true;

            const formData = new FormData(form);
            const payload = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                payload.append(key, value);
            }

            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Wysyłam...";

            fetch("send_mail.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: payload.toString()
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data && data.status === "ok") {
                        success.hidden = false;
                        form.reset();
                    } else {
                        alert("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie za chwilę.");
                    }
                })
                .catch(function () {
                    alert("Nie udało się połączyć z serwerem. Sprawdź połączenie lub spróbuj ponownie później.");
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }
});
