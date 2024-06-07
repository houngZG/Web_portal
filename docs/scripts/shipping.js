document.addEventListener('DOMContentLoaded', function() {
    const checkout = document.querySelector('.pay-button');

    checkout.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '../view/confirm_order.html';
    });
});