document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields are filled
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            alert('Please fill in all fields.');
            return; // Prevent further execution
        }
        
        // Proceed to index page if all fields are filled
        window.location.href = '../../index.html';
    });
});
