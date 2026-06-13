/* ============================================================
   UniJobs — js/main.js
   General site-wide JavaScript (jQuery + vanilla JS)
   Handles: mobile nav toggle, hero search redirect,
            featured jobs fade-in on scroll
   ============================================================ */

$(document).ready(function () {

    /* --------------------------------------------------
       1. Mobile Navigation Toggle
       --------------------------------------------------
       Toggles the .open class on the nav links list
       when the hamburger icon is clicked.
    -------------------------------------------------- */
    $('#navToggle').on('click', function () {
        $('#navLinks').toggleClass('open');
    });

    /* Close nav if user clicks a link (on mobile) */
    $('#navLinks a').on('click', function () {
        $('#navLinks').removeClass('open');
    });

    /* --------------------------------------------------
       2. Featured Jobs — Scroll-triggered Fade-In (jQuery)
       --------------------------------------------------
       Each .job-card starts with opacity:0 (set in CSS).
       When the card enters the viewport during scroll,
       we animate it to opacity:1 with a slight slide up.
    -------------------------------------------------- */
    function revealJobCards() {
        $('.job-card').each(function (index) {
            var cardTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            /* If the card is within the visible area */
            if (cardTop < windowBottom - 60) {
                /* Stagger the animation using a delay based on index */
                var delay = index * 120;
                var $card = $(this);
                setTimeout(function () {
                    $card.css({
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                        opacity: 1,
                        transform: 'translateY(0)'
                    });
                }, delay);
            }
        });
    }

    /* Run on page load (for cards already in view) */
    revealJobCards();

    /* Run every time the user scrolls */
    $(window).on('scroll', revealJobCards);

    /* --------------------------------------------------
       3. Salary Range Slider (Jobs page sidebar)
       --------------------------------------------------
       Updates the displayed salary label live as the
       range input changes.
    -------------------------------------------------- */
    $('#salaryRange').on('input', function () {
        var val = parseInt($(this).val()).toLocaleString();
        $('#salaryDisplay').text('LKR ' + val + '+');
    });

});

/* --------------------------------------------------
   4. Hero Search Redirect (vanilla JS)
   --------------------------------------------------
   Reads the search input value and redirects to
   jobs.html with a query string so the page can
   optionally use it to pre-filter.
-------------------------------------------------- */
function handleHeroSearch() {
    var query = document.getElementById('heroSearch').value.trim();
    if (query.length > 0) {
        window.location.href = 'jobs.html?q=' + encodeURIComponent(query);
    } else {
        window.location.href = 'jobs.html';
    }
}
