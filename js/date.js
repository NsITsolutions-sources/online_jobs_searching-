function updateDateTime() {
            var now = new Date();
            var options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
     };
             var formattedDateTime = now.toLocaleDateString('en-US', options);
             document.getElementById('footer-date').textContent = formattedDateTime;
}
updateDateTime();
