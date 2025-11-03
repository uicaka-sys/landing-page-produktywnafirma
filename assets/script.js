document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const form = document.getElementById("contact-form");
    const success = document.getElementById("form-success");

    if (form && success) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            success.hidden = false;
            form.reset();
        });
    }
});
