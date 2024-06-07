document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reset-password-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const saveButton = document.querySelector('.verify-button');

    // Function to validate password
    function validatePassword(password) {
        // Password must be at least 8 characters long and start with a capital letter
        const regex = /^(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    }

    // Function to validate confirm password
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Function to update error messages for password field
    function updatePasswordError() {
        const password = passwordInput.value;
        if (!validatePassword(password)) {
            passwordError.textContent = "Password must be at least 8 characters long and start with a capital letter.";
        } else {
            passwordError.textContent = "";
        }
    }

    // Function to update error messages for confirm password field
    function updateConfirmPasswordError() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (!validateConfirmPassword(password, confirmPassword)) {
            confirmPasswordError.textContent = "Passwords do not match.";
        } else {
            confirmPasswordError.textContent = "";
        }
    }

    // Function to enable/disable save button based on validation
    function updateSaveButton() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        saveButton.disabled = !validatePassword(password) || !validateConfirmPassword(password, confirmPassword);
    }

    // Add event listeners for input fields
    passwordInput.addEventListener('input', function() {
        updatePasswordError();
        updateSaveButton();
    });

    confirmPasswordInput.addEventListener('input', function() {
        updateConfirmPasswordError();
        updateSaveButton();
    });

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Perform action if form is valid
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (validatePassword(password) && validateConfirmPassword(password, confirmPassword)) {
            // Add your logic here to save the password and move to the next step
            window.location.href = '../../index.html'; // For now, redirect to index.html
        }
    });
});
