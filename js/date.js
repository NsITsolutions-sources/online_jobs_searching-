function updateFooterDate() {
    const dateElement = document.getElementById('footer-date');

    if (!dateElement) {
        return;
    }

    const today = new Date();
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    dateElement.textContent = today.toLocaleDateString('en-US', dateOptions);
}

updateFooterDate();
