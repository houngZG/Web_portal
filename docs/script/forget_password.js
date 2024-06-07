document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forget-password-form');
    const emailInput = document.getElementById('email');
    const verifyCodeInput = document.getElementById('verify-code');
    const sendButton = document.querySelector('.input-group button');
    const verifyButton = document.querySelector('.verify-button');
    const infoText = document.querySelector('.info-text');

    let verificationCode = ''; // Variable to store the generated verification code

    // Function to generate a random 6-digit verification code
    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to enable/disable verify button based on inputs
    function updateVerifyButtonState() {
        verifyButton.disabled = !(emailInput.value.trim() !== '' && validateEmail(emailInput.value.trim()) && verifyCodeInput.value.trim() !== '');
    }

    // Event listener for email input to enable/disable send button
    emailInput.addEventListener('input', function() {
        sendButton.disabled = !validateEmail(emailInput.value.trim());
        updateVerifyButtonState();
    });

    // Event listener for verify code input to enable/disable verify button
    verifyCodeInput.addEventListener('input', function() {
        updateVerifyButtonState();
    });

    // Function to display the generated code below the email input
    function displayVerificationCode() {
        if (emailInput.value.trim() !== '' && validateEmail(emailInput.value.trim()) && verifyCodeInput.value.trim() === '') {
            verificationCode = generateVerificationCode();
            const codeMessage = document.createElement('p');
            codeMessage.textContent = `Verification code: ${verificationCode}`;
            codeMessage.classList.add('code-message');
            form.insertBefore(codeMessage, verifyButton);
            verifyButton.disabled = false; // Enable verify button
        } else if (verifyCodeInput.value.trim() !== '') {
            alert('Verification code has already been generated. Please submit the form.');
        } else {
            alert('Please enter a valid email address.');
        }
    }

    // Event listener for the send button to display the verification code
    sendButton.addEventListener('click', function() {
        // Disable the send button to prevent multiple clicks
        sendButton.disabled = true;
        displayVerificationCode();
        verifyCodeInput.focus(); // Focus on the verification code input field
    });

    // Event listener for email input to enable/disable verify button
    emailInput.addEventListener('input', function() {
        updateVerifyButtonState();
    });

    // Event listener for verify code input to enable/disable verify button
    verifyCodeInput.addEventListener('input', function() {
        updateVerifyButtonState();
    });

    // Function to handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!verifyButton.disabled) {
            const enteredCode = verifyCodeInput.value.trim();

            if (enteredCode === verificationCode.toString()) {
                // If the entered code matches the generated code
                window.location.href = 'reset_password.html'; // Redirect to reset password page
            } else {
                // If the entered code is incorrect
                alert('Incorrect verification code. Please try again.');
                verifyCodeInput.value = ''; // Clear the input field
                verifyCodeInput.focus(); // Refocus on the verification code input field
            }
        } else {
            alert('Please fill in both email and verification code fields.');
        }
    });

    // Event listener for the verify button to handle form submission
    verifyButton.addEventListener('click', function() {
        // Manually trigger form submission when verify button is clicked
        form.dispatchEvent(new Event('submit'));
    });
});
