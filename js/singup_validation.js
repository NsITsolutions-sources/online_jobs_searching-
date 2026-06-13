function getElement(id) {
    return document.getElementById(id);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSignUpError(errorId, message) {
    const errorElement = getElement(errorId);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function resetSignUpErrors() {
    document.querySelectorAll('.error-msg').forEach(function (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    });

    const successMessage = getElement('formSuccess');

    if (successMessage) {
        successMessage.classList.remove('show');
    }
}

function validateAndSubmit() {
    resetSignUpErrors();

    const fullName = getElement('fullName').value.trim();
    const email = getElement('email').value.trim();
    const password = getElement('password').value;
    const confirmPassword = getElement('confirmPassword').value;
    const agreedTerms = getElement('agreeTerms').checked;

    let isValid = true;

    if (!fullName) {
        showSignUpError('err-fullName', 'Please enter your full name.');
        isValid = false;
    }

    if (!email) {
        showSignUpError('err-email', 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showSignUpError('err-email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!password) {
        showSignUpError('err-password', 'Please enter a password.');
        isValid = false;
    } else if (password.length < 6) {
        showSignUpError('err-password', 'Password must be at least 6 characters long.');
        isValid = false;
    }

    if (!confirmPassword) {
        showSignUpError('err-confirmPassword', 'Please confirm your password.');
        isValid = false;
    } else if (password !== confirmPassword) {
        showSignUpError('err-confirmPassword', 'Passwords do not match.');
        isValid = false;
    }

    if (!agreedTerms) {
        showSignUpError('err-agreeTerms', 'You must agree to the terms.');
        isValid = false;
    }

    if (isValid) {
        showSignUpSuccess();
    }
}

function showSignUpSuccess() {
    const signUpForm = getElement('signUpForm');
    const successMessage = getElement('formSuccess');

    if (signUpForm) {
        signUpForm.reset();
    }

    if (successMessage) {
        successMessage.classList.add('show');
    }
}
