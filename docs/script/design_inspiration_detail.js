let totalPrice = 150;
let rielPrice = 600000;

function addToCart(item, price) {
    totalPrice += price;
    rielPrice = totalPrice * 4000;  // Assuming a conversion rate of 4000 Riel to 1 USD
    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('riel-price').innerText = rielPrice;
    alert(item + ' added to cart!');
}

function cancelOrder() {
    totalPrice = 150;
    rielPrice = 600000;
    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('riel-price').innerText = rielPrice;
    alert('Order canceled!');
}

function placeOrder() {
    alert('Order placed! Total: $' + totalPrice + ' (Riel: ' + rielPrice + ')');
    // Here you would typically send the order details to a backend server
}
