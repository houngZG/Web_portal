import Menu from "./menu.js";
import ShoppingCardScript from "./shopping_cart.js";

class ProductDetailScript {
    constructor(prodetaiL) {
        this.prodetaiL = prodetaiL;
        this.isCounter = false;
    }

    renderProductDetails(item) {
        const data = JSON.parse(item);
        this.addToCard(data);
        console.log(data);

        const wiatForElement = setInterval(() => {
            this.prodetaiL = document.querySelector(".product-container");
            let colorsHtml = '';

            if (!data || typeof data !== 'object') {
                console.error('Invalid item data provided.');
                return;
            }

            if (data.colors && Array.isArray(data.colors)) {
                data.colors.forEach(color => {
                    colorsHtml += `<div class="color-radius" style="background-color: ${color};"></div>`;
                });
            }

            if (this.prodetaiL) {
                clearInterval(wiatForElement);

                var details = `
                    <div class="product-image">
                        <img id="productImage" src="${data.image}" alt="${data.image}">
                    </div>
                    <div class="product-details">
                        <h1 id="title">${data.product_name}</h1>
                        <div class="product-price">
                            <div class="product-details-left">
                                <div class="rating">
                                    ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
                                </div>
                                <div class="price">${data.price}</div>
                                <div class="product-origin">Product from: <span>${data.product_from}</span></div>
                            </div>
                            <hr style="margin-inline-start: 10%; margin-inline-end: 10%;">
                            <div class="product-details-right">
                                <div class="color">
                                    <p>Color:</p>
                                    ${colorsHtml}
                                </div>
                                <div class="dimensions">
                                    <span>Width:<br>${data.width} Cm</span><hr>
                                    <span>Height:<br>${data.height} Cm</span><hr>
                                    <span>Warranty:<br>${data.warranty} Year</span>
                                </div>
                            </div>
                        </div>
                        <p class="description">${data.description}</p>
                        <div class="actions">
                            <button class="add-to-cart" id="add-to-card">Add to Cart</button>
                            <button class="order">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg> &nbsp; &nbsp;
                                Order
                            </button>
                        </div>
                    </div>
                `;

                this.prodetaiL.innerHTML = details;
            } else {
                // console.error('Required elements not found.');
            }
        });
    }

    addToCard(item) {
        const waitHmlElement = setInterval(() => {
            const addCard = document.querySelector("#add-to-card");
            const alertNoti = document.getElementById("alert-noti");
            const message = document.getElementById("message");
            const shopping = new ShoppingCardScript();
            const m = new Menu();
            var c = 0;
            var id = "";

            if (addCard) {
                clearInterval(waitHmlElement);
                addCard.addEventListener('click', async () => {
                    if (id === item.id) {
                        alertNoti.style.right = "-20px";
                        alertNoti.style.backgroundColor = "#FFA27F";
                        this.changeIconMsg({ isSuccess: false });
                        await setTimeout(() => {
                            alertNoti.style.right = "-400px";
                        }, 7000);
                        return console.log("product already added to card");
                    }

                    if (item) {
                        console.log(item)
                        shopping.readAndWriteCard(JSON.stringify(item));
                        m.setCounter({ isCount: true });

                        id = item.id;
                        addCard.innerHTML = "Cancel Card";
                        alertNoti.style.right = "-20px";
                        alertNoti.style.backgroundColor = "#40A2E3";
                        this.changeIconMsg({ isSuccess: true });
                        await setTimeout(() => {
                            alertNoti.style.right = "-400px";
                        }, 7000);
                        return console.log("added success");
                    }
                });
            } else {
                console.error('Element with ID "add-to-card" not found');
            }
        });

    }

    changeIconMsg({ isSuccess = false }) {
        const waitting = setInterval(() => {
            const alert = document.getElementById("alert-noti");
            if (alert) {
                clearInterval(waitting);

                if (!isSuccess) {
                    let icon = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <div id="message">Product already added to card!</div>
                    `;
                    return alert.innerHTML = icon;
                }

                if (isSuccess) {
                    let icon = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <div id="message">Add successfully!</div>
                    `;
                    return alert.innerHTML = icon;
                }
            }
        });
    }
}

new ProductDetailScript();
export default ProductDetailScript;
