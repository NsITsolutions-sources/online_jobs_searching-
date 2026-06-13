const MAX_CV_SIZE = 5 * 1024 * 1024;

function getElement(id) {
    return document.getElementById(id);
}

function showFieldError(fieldId, message) {
    const field = getElement(fieldId);
    const errorElement = getElement('err-' + fieldId);

    if (field) {
        field.classList.add('error');
    }

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }
}

function clearFormErrors() {
    document.querySelectorAll('.error').forEach(function (field) {
        field.classList.remove('error');
    });

    document.querySelectorAll('.error-msg').forEach(function (errorElement) {
        errorElement.classList.remove('visible');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/[\s-]/g, '');
    return /^0\d{9}$/.test(cleanPhone);
}

function validateAndSubmit() {
    clearFormErrors();

    const firstName = getElement('firstName').value.trim();
    const lastName = getElement('lastName').value.trim();
    const email = getElement('email').value.trim();
    const phone = getElement('phone').value.trim();
    const studyYear = getElement('studyYear').value;
    const jobRole = getElement('jobRole').value;
    const coverNote = getElement('coverNote').value.trim();
    const cvFile = getElement('cvFile').files;
    const agreedTerms = getElement('agreeTerms').checked;

    let isValid = true;

    if (!firstName) {
        showFieldError('firstName', 'First name is required.');
        isValid = false;
    }

    if (!lastName) {
        showFieldError('lastName', 'Last name is required.');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        showFieldError('email', 'Enter a valid email address.');
        isValid = false;
    }

    if (!isValidPhone(phone)) {
        showFieldError('phone', 'Enter a valid 10-digit phone number.');
        isValid = false;
    }

    if (!studyYear) {
        showFieldError('studyYear', 'Please select your year of study.');
        isValid = false;
    }

    if (!jobRole) {
        showFieldError('jobRole', 'Please select a position.');
        isValid = false;
    }

    if (coverNote.length < 30) {
        showFieldError('coverNote', 'Cover note must be at least 30 characters.');
        isValid = false;
    }

    if (!cvFile || cvFile.length === 0) {
        showFieldError('cvFile', 'Please upload your CV.');
        isValid = false;
    }

    if (!agreedTerms) {
        showFieldError('agreeTerms', 'You must agree to the terms.');
        isValid = false;
    }

    if (isValid) {
        showApplicationSuccess();
    }
}

function showApplicationSuccess() {
    const submitButton = getElement('submitBtn');
    const successMessage = getElement('formSuccess');

    if (!submitButton || !successMessage) {
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    setTimeout(function () {
        successMessage.classList.add('show');
        submitButton.textContent = 'Application Submitted';
    }, 800);
}

function handleFileSelect(input) {
    const fileNameDisplay = getElement('fileNameDisplay');

    if (!input.files || input.files.length === 0) {
        return;
    }

    const selectedFile = input.files[0];

    if (selectedFile.size > MAX_CV_SIZE) {
        alert('File too large. Please upload a CV under 5MB.');
        input.value = '';

        if (fileNameDisplay) {
            fileNameDisplay.textContent = '';
        }

        showFieldError('cvFile', 'Please upload a CV under 5MB.');
        return;
    }

    if (fileNameDisplay) {
        fileNameDisplay.textContent = selectedFile.name;
    }

    getElement('cvFile').classList.remove('error');
    getElement('err-cvFile').classList.remove('visible');
}
