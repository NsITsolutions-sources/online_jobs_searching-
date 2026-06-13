    function validateAndSubmit() {
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // Reset error messages
            resetErrors();

            let valid = true;

            if (fullName === '') {
                showError('err-fullName', 'Please enter your full name.');
                valid = false;
            }

            if (email === '') {
                showError('err-email', 'Please enter your email address.');
                valid = false;
            } else if (!isValidEmail(email)) {
                showError('err-email', 'Please enter a valid email address.');
                valid = false;
            }

            if (password === '') {
                showError('err-password', 'Please enter a password.');
                valid = false;
            } else if (password.length < 6) {
                showError('err-password', 'Password must be at least 6 characters long.');
                valid = false;
            }

            if (confirmPassword === '') {
                showError('err-confirmPassword', 'Please confirm your password.');
                valid = false;
            } else if (password !== confirmPassword) {
                showError('err-confirmPassword', 'Passwords do not match.');
                valid = false;
            }

            if (!agreeTerms) {
                showError('err-agreeTerms', 'You must agree to the terms.');
                valid = false;
            }

            if (valid) {
                // Show success message
                document.getElementById('formSuccess').classList.add('show');
                // Optionally, reset the form
                document.getElementById('signUpForm').reset();
            }
        }

        function showError(elementId, message) {
            const errorSpan = document.getElementById(elementId);
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }

        function resetErrors() {
            const errorSpans = document.querySelectorAll('.error-msg');
            errorSpans.forEach(span => {
                span.style.display = 'none';
            });
            document.getElementById('formSuccess').classList.remove('show');
        }

        function isValidEmail(email) {
            // Simple email validation regex
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
