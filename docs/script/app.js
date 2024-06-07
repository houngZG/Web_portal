let isOpen = false;
localStorage.getItem('getItems');

function toggleMoreText() {
    var moreText = document.getElementById("more-text");
    var buttonText = document.getElementById("more-button");

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "block";
        buttonText.textContent = "See Less";
    } else {
        moreText.style.display = "none";
        buttonText.textContent = "See More";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const contentContainer = document.querySelector('main');
    const cartLink = document.querySelector('a[href="#"]');
    let startItem = 0;
    let endItem = 8;
    let lengthData = 0;
    const json = "data.json";

    if (!contentContainer) {
        console.error('Error: Main content container not found');
        return;
    }

    // Function to load content
    function loadContent(url, scriptUrl) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
                if (scriptUrl) {
                    loadScript(scriptUrl, () => {
                        if (url.includes('furniture.html')) {
                            fetchData();
                            clickTile();
                            clickPage();
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching content:', error));
    }

    // Function to dynamically load a script
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            console.log(`Script ${url} loaded successfully.`);
            if (callback) callback();
        };
        script.onerror = () => console.error(`Error loading script ${url}`);
        document.body.appendChild(script);
    }

    loadContent('view/home.html');

    function setInitialNavSelection() {
        const firstNavLink = document.querySelector('nav ul li a');
        if (firstNavLink) {
            firstNavLink.classList.add('selected-nav');
        }
    }
    setInitialNavSelection();

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const url = event.target.getAttribute('href');
            console.log("url: " + url);

            // Remove the selected class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('selected-nav');
            });

            // Add the selected class to the clicked link
            //link.classList.add('selected-nav');
            // we can use link. or event.target as well.
            event.target.classList.add('selected-nav');

            let scriptUrl;
            if (url === './view/furniture.html') {
                scriptUrl = 'script/furniture.js';
            } else if (url === './view/product_details.html') {
                scriptUrl = 'script/product_details.js';
            }
            loadContent(url, scriptUrl);
        });
    });

    cartLink?.addEventListener('click', function (event) {
        event.preventDefault();
        const url = 'view/shopping_cart.html';
        loadContent(url);
    });

    function fetchData(start = 0, end = 8) {
        fetch(json)
            .then(response => response.json())
            .then(datas => {
                const furnituresHTML = document.querySelector(".parent-card");

                if (!furnituresHTML) {
                    console.error('Error: .parent-card element not found');
                    return;
                }

                let getData = "";
                const l = datas.data.furnitures;
                lengthData = l.length;
                console.log(lengthData);

                if (startItem < 0) {
                    start = 0;
                    end = 8;
                }

                if (end >= lengthData) {
                    end = lengthData;
                }

                l.slice(start, end).forEach(item => {
                    getData += `
                        <div class="card product-card" id="card-product-${item.id}">
                            <img class="card-img-top" src="${item.image}" alt="${item.product_name}" />
                            <div class="card-text name-card text-start p-1 p-sm-1 p-md-2 p-lg-3 p-xl-3 p-xxl-3">
                                <ul class="list">
                                    <li class="title">${item.product_name}</li>
                                    <li>Product order list: 00${item.id}</li>
                                    <li>Rating: ${generateStars(item.rating)}</li>
                                    <li>Price: ${item.price}</li>
                                    <li>Discount: ${item.discount}</li>
                                </ul>
                            </div>
                        </div>
                    `;
                });
                furnituresHTML.innerHTML = getData;

                //load data into products screen
                loadProductDetail(l, start, end);

            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="${i <= rating ? 'star-active' : 'star-unactive'} bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
        }
        return stars;
    }

    function clickTile() {
        const tiles = document.querySelectorAll('.txt');
        tiles.forEach(tile => {
            tile.addEventListener('click', function () {
                console.log('Tile clicked:', this);
            });
        });
    }

    function doPagination(isPlus = false) {
        console.log(isPlus);
        if (isPlus === true) {
            if (endItem >= lengthData) {
                return console.log("invalid value for plus");
            } else {
                startItem += 8;
                endItem += 8;
            }
        } else {
            if (startItem <= 0) {
                return console.log("invalid value for minus");
            } else {
                startItem -= 8;
                endItem -= 8;
            }
        }
        fetchData(startItem, endItem);
    }

    function clickPage() {
        const plusPagination = document.getElementById('plus-pagination');
        const minusPagination = document.getElementById('minus-pagination');
        if (plusPagination) {
            plusPagination.addEventListener('click', () => {
                doPagination(true);
            });
        } else {
            console.error('Element plusPagination not found');
        }

        if (minusPagination) {
            minusPagination.addEventListener('click', () => {
                doPagination(false);
            });
        } else {
            console.error('Element minusPagination not found');
        }
    }

    async function loadProductDetail(products, start, end) {
        products.slice(start, end).forEach(item => {
            const cardProduct = document.getElementById(`card-product-${item.id}`);
            cardProduct.addEventListener('click', function (event) {
                event.preventDefault();
                const url = 'view/product_details.html';
                const script = 'script/product_details.js';

                localStorage.setItem('getItems', JSON.stringify(item));
                loadContent(url, script);
            });
        });
    }

    menuToggle();
    subMenu();
    closedMenu();
    dropdownMenu();
});


async function subMenu() {
    const submenu = document.getElementById("sub-menu");
    const parent = document.querySelector(".parent-submenu");

    if (!submenu) {
        console.error('Error: #sub-menu element not found');
        return;
    }

    if (!parent) {
        console.error('Error: .parent-submenu element not found');
        return;
    }

    parent.addEventListener('click', () => {
        submenu.style.display = "block";
    });
}

async function menuToggle() {
    const open = document.getElementById("logo-menu");
    const bodyMenu = document.getElementById("menu");
    const submenu = document.getElementById("sub-menu");
    const menuIcon = document.querySelector(".toggle-menu");

    if (!open || !bodyMenu) {
        console.error('Required elements not found');
        return;
    }

    open.addEventListener("click", () => {
        if (isOpen) {
            bodyMenu.style.display = "none";
            toggleMenuIcon().then((value) => {
                menuIcon.innerHTML = value;
            });
            if (submenu) submenu.style.display = "block";
        } else {
            bodyMenu.style.display = "block";
            toggleMenuIcon().then((value) => {
                menuIcon.innerHTML = value;
            });
        }
        isOpen = !isOpen
    });
}

async function toggleMenuIcon() {
    let iconToggle;
    if (!isOpen) {
        iconToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>`;
    } else {
        iconToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg>`;
    }

    return iconToggle;
}

function applyPromo() {
    var inputField = document.getElementById("promoInput");
    var promoCode = inputField.value.trim();

    var validCodes = ["abc123", "def456", "ghi789", "ghi784", "houngvip"];
    var isValid = validCodes.includes(promoCode);

    var tickIcon = document.querySelector(".promo-code-input .fa-check");
    var crossIcon = document.querySelector(".promo-code-input .fa-times");
    var message = document.querySelector(".promoMessage");
    var total = document.querySelector(".total");
    if (isValid) {
        tickIcon.style.display = "inline";
        crossIcon.style.display = "none";

        if (promoCode === "houngvip") {
            message.textContent = "Offer: 75%";
            total.textContent = "102 $"
        } else if (promoCode === "abc123") {
            message.textContent = "Offer: 50%";
            total.textContent = "204 $"
        } else if (promoCode === "def456") {
            message.textContent = "Offer: 25%";
            total.textContent = "306 $"
        } else if (promoCode === "ghi789") {
            message.textContent = "Offer: 10%";
            total.textContent = "367.2 $"
        } else {
            message.textContent = "Sorry, This code is not available for now!";
        }
      
    } else {
        tickIcon.style.display = "none";
        crossIcon.style.display = "inline";
        total.textContent = "408 $"
        message.textContent = "Sorry, This code is invalid!"
    }

    if (promoCode === "" && !isValid) {
        promoCode = generateRandomCode();
    }

    inputField.value = promoCode;
}


function generateRandomCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var length = 6;
    var randomCode = '';

    for (var i = 0; i < length; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomCode;
}

function dropdownMenu() {
    const drop = document.getElementById("dropdown-menu");
    const mainMenu = document.getElementById("mainText");
    var showSubMenu = true;

    mainMenu.addEventListener('click', () => {
        if(drop.style.display === "none"){
            showSubMenu = true;
        }

        if(showSubMenu){
            drop.style.display = "block";
        }else{
            drop.style.display = "none";
        }

        showSubMenu =! showSubMenu;
    });
}

function closedMenu() {
    const contentMenu = document.querySelectorAll("#content-menu");
    const drop = document.getElementById("dropdown-menu");

    contentMenu.forEach(clicked => {
        clicked.addEventListener('click', () => {
            drop.style.display = "none";
        });
    }, this);
}