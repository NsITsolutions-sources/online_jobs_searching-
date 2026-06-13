/* UniJobs - Form Validation for apply.html */

function showError(id, msg) {
    document.getElementById(id).classList.add('error');
    document.getElementById('err-' + id).textContent = msg;
    document.getElementById('err-' + id).classList.add('visible');
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('visible'));
}

function validateAndSubmit() {
    clearErrors();
    var ok = true;

    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var email     = document.getElementById('email').value.trim();
    var phone     = document.getElementById('phone').value.trim();
    var studyYear = document.getElementById('studyYear').value;
    var jobRole   = document.getElementById('jobRole').value;
    var coverNote = document.getElementById('coverNote').value.trim();
    var cvFile    = document.getElementById('cvFile').files;
    var agreed    = document.getElementById('agreeTerms').checked;

    if (!firstName)               { showError('firstName', 'First name is required.');          ok = false; }
    if (!lastName)                { showError('lastName',  'Last name is required.');            ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Enter a valid email.'); ok = false; }
    if (!/^0\d{9}$/.test(phone.replace(/[\s-]/g, ''))) { showError('phone', 'Enter a valid 10-digit phone number.'); ok = false; }
    if (!studyYear)               { showError('studyYear', 'Please select your year of study.'); ok = false; }
    if (!jobRole)                 { showError('jobRole',   'Please select a position.');         ok = false; }
    if (coverNote.length < 30)    { showError('coverNote', 'Cover note must be at least 30 characters.'); ok = false; }
    if (!cvFile || cvFile.length === 0) { showError('cvFile', 'Please upload your CV.');        ok = false; }
    if (!agreed)                  { showError('agreeTerms', 'You must agree to the terms.');    ok = false; }

    if (ok) {
        var btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Submitting...';
        setTimeout(function () {
            document.getElementById('formSuccess').classList.add('show');
            btn.textContent = 'Application Submitted ✓';
        }, 800);
    }
}

function handleFileSelect(input) {
    var dis = document.getElementById('fileNameDisplay');
    if (input.files && input.files[0]) {
        if (input.files[0].size > 5 * 1024 * 1024) {
            alert('File too large. Max 5MB.');
            input.value = '';
            dis.textContent = '';
        } else {
            dis.textContent = '✅ ' + input.files[0].name;
            document.getElementById('cvFile').classList.remove('error');
            document.getElementById('err-cvFile').classList.remove('visible');
        }
    }
}