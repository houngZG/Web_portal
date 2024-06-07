document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.querySelector('.btn-signup');
    const signinButton = document.querySelector('.btn-signin');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    signupButton.addEventListener('click', function() {
        window.location.href = '../authentication/register.html'; 
    });

    forgotPasswordLink.addEventListener('click', function() {
        window.location.href = '../authentication/forget_password.html';
    });

    signinButton.addEventListener('click', function(event) {
        // if we use button type submit we need to use this 
        // function to prevent submit else we can replace submit to normal 'button'.
        event.preventDefault(); 
        if (validateEmail() && validatePassword()) {
            window.location.href = '../../index.html';
        }
    });

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue)) {
            emailError.textContent = 'Email must be a valid @gmail.com address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue === '') {
            passwordError.textContent = 'Password is required';
            return false;
        } else if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    function toggleButtonState() {
        if (validateEmail() && validatePassword()) {
            signinButton.disabled = false;
        } else {
            signinButton.disabled = true;
        }
    }

    emailInput.addEventListener('input', function() {
        validateEmail();
        toggleButtonState();
    });

    passwordInput.addEventListener('input', function() {
        validatePassword();
        toggleButtonState();
    });
});
