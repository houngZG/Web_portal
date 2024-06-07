function toggleMoreText() {
    const moreText = document.getElementById("more-text");
    const buttonText = document.getElementById("more-button");

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "block";
        buttonText.textContent = "See Less";
    } else {
        moreText.style.display = "none";
        buttonText.textContent = "See More";
    }
}

function applyPromo() {
    const inputField = document.getElementById("promoInput");
    const promoCode = inputField.value.trim();

    const validCodes = ["abc123", "def456", "ghi789", "ghi784", "houngvip"];
    const isValid = validCodes.includes(promoCode);

    const tickIcon = document.querySelector(".promo-code-input .fa-check");
    const crossIcon = document.querySelector(".promo-code-input .fa-times");
    const message = document.querySelector(".promoMessage");
    const total = document.querySelector(".total");

    if (isValid) {
        tickIcon.style.display = "inline";
        crossIcon.style.display = "none";

        const discounts = {
            "houngvip": 75,
            "abc123": 50,
            "def456": 25,
            "ghi789": 10
        };

        const discount = discounts[promoCode] || 0;
        const newTotal = 408 * (1 - discount / 100);
        message.textContent = `Offer: ${discount}%`;
        total.textContent = `${newTotal} $`;
    } else {
        tickIcon.style.display = "none";
        crossIcon.style.display = "inline";
        total.textContent = "408 $";
        message.textContent = "Sorry, This code is invalid!";
    }

    if (!promoCode && !isValid) {
        inputField.value = generateRandomCode();
    }
}

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let randomCode = '';

    for (let i = 0; i < length; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomCode;
}
