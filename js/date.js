(function () {
    function getElement(id) {
        return document.getElementById(id);
    }

    function updateFooterDate() {
        const dateElement = getElement('footer-date');

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

    function setupDynamicDates() {
        document.querySelectorAll('.dynamic-date').forEach(function (dateElement) {
            const today = new Date();
            dateElement.textContent = today.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        });

        const todayLabel = getElement('todayLabel');

        if (todayLabel) {
            todayLabel.textContent = 'Updates posted on ' + new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        }
    }

    function setupNavigation() {
        const navToggle = getElement('navToggle');
        const navLinks = getElement('navLinks');

        if (!navToggle || !navLinks) {
            return;
        }

        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function handleHeroSearch() {
        const searchInput = getElement('heroSearch');
        const query = searchInput ? searchInput.value.trim() : '';

        if (!query) {
            window.location.href = 'jobs.html';
            return;
        }

        window.location.href = 'jobs.html?q=' + encodeURIComponent(query);
    }

    function setupJobsPage() {
        const jobsList = getElement('jobsList');
        const jobCount = getElement('jobCount');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const salaryRange = getElement('salaryRange');
        const salaryDisplay = getElement('salaryDisplay');
        const sortJobs = getElement('sortJobs');

        if (!jobsList) {
            return;
        }

        const jobRows = Array.from(jobsList.querySelectorAll('.job-row'));

        function getVisibleJobs() {
            return jobRows.filter(function (row) {
                return row.style.display !== 'none';
            });
        }

        function updateJobCount() {
            const count = getVisibleJobs().length;

            if (jobCount) {
                jobCount.textContent = 'Showing ' + count + ' job' + (count === 1 ? '' : 's');
            }
        }

        function filterJobs() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const selectedFilter = activeFilter ? activeFilter.dataset.filter : 'all';

            jobRows.forEach(function (row) {
                const rowTypes = (row.dataset.type || '').split(' ');
                const matchesFilter = selectedFilter === 'all' || rowTypes.includes(selectedFilter);
                const matchesSalary = !salaryRange || parseInt(row.dataset.salary || '0', 10) >= parseInt(salaryRange.value, 10);
                row.style.display = matchesFilter && matchesSalary ? 'flex' : 'none';
            });

            sortJobsList();
            updateJobCount();
        }

        function sortJobsList() {
            if (!sortJobs) {
                return;
            }

            const visibleJobs = getVisibleJobs();
            const jobs = Array.from(jobsList.children).filter(function (row) {
                return visibleJobs.includes(row);
            });

            jobs.sort(function (a, b) {
                if (sortJobs.value === 'salary') {
                    return parseInt(b.dataset.salary || '0', 10) - parseInt(a.dataset.salary || '0', 10);
                }

                if (sortJobs.value === 'az') {
                    return (a.dataset.company || '').localeCompare(b.dataset.company || '');
                }

                return parseInt(b.dataset.created || '0', 10) - parseInt(a.dataset.created || '0', 10);
            });

            jobs.forEach(function (job) {
                jobsList.appendChild(job);
            });
        }

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                filterButtons.forEach(function (filterButton) {
                    filterButton.classList.remove('active');
                });

                button.classList.add('active');
                filterJobs();
            });
        });

        if (salaryRange) {
            salaryRange.addEventListener('input', function () {
                if (salaryDisplay) {
                    salaryDisplay.textContent = 'LKR ' + parseInt(salaryRange.value, 10).toLocaleString('en-US') + '+';
                }

                filterJobs();
            });
        }

        if (sortJobs) {
            sortJobs.addEventListener('change', function () {
                sortJobsList();
            });
        }

        if (window.location.search) {
            const params = new URLSearchParams(window.location.search);
            const category = params.get('cat');
            const query = params.get('q');

            if (category) {
                filterButtons.forEach(function (button) {
                    button.classList.toggle('active', button.dataset.filter === category);
                });
            }

            if (query && getElement('heroSearch')) {
                getElement('heroSearch').value = query;
            }

            if (category || query) {
                filterJobs();
            }
        }

        updateJobCount();
    }

    function setupApplicationDeadline() {
        const deadlineDate = getElement('deadlineDate');
        const daysLeft = getElement('daysLeft');

        if (!deadlineDate && !daysLeft) {
            return;
        }

        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 30);

        const now = new Date();
        const remainingDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (deadlineDate) {
            deadlineDate.textContent = deadline.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }

        if (daysLeft) {
            daysLeft.textContent = remainingDays + ' days left';
        }
    }

    function setupResourcesAccordion() {
        const accordion = getElement('faqAccordion');

        if (!accordion) {
            return;
        }

        accordion.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                const body = trigger.nextElementSibling;
                const isOpen = trigger.classList.toggle('open');

                trigger.setAttribute('aria-expanded', String(isOpen));
                body.style.display = isOpen ? 'block' : 'none';
            });
        });
    }

    function init() {
        updateFooterDate();
        setupDynamicDates();
        setupNavigation();
        setupJobsPage();
        setupResourcesAccordion();
        setupApplicationDeadline();
    }

    window.handleHeroSearch = handleHeroSearch;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
