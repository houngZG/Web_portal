document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    const colors = document.querySelectorAll('.color');
    const quantityInput = document.getElementById('quantity');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const closeButton = document.querySelector('.close-button');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');

    let currentImageIndex = 0;
    const images = [
        '../images/im_chair.png',
        '../images/black_chair.png',
        '../images/white_chair.png'
    ];

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.src;
            currentImageIndex = index;
        });
    });

    colors.forEach(color => {
        color.addEventListener('click', () => {
            colors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
        });
    });

    increaseButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    leftButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) < 0 ? images.length - 1 : (currentImageIndex - 1) % images.length;
        mainImage.src = images[currentImageIndex];
        updateActiveThumbnail();
    });

    rightButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.src = images[currentImageIndex];
        updateActiveThumbnail();
    });

    closeButton.addEventListener('click', () => {
        // Assuming you want to close or hide the product container
        document.querySelector('.product-container').style.display = 'none';
    });

    function updateActiveThumbnail() {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.remove('active');
            if (index === currentImageIndex) {
                thumb.classList.add('active');
            }
        });
    }
});