import ShoppingCardScript from "./shopping_cart.js";
class Menu {
    constructor(card) {
        this.isOpen = false;
        this.submenu = document.getElementById("sub-menu");
        this.parent = document.querySelector(".parent-submenu");
        this.init();
    }

    init() {
        this.setupToggleMenu();
        this.setupSubMenu();
        this.setupDropdownMenu();
        this.setupCloseMenu();
    }

    setupToggleMenu() {
        const open = document.getElementById("logo-menu");
        const bodyMenu = document.getElementById("menu");
        const submenu = document.getElementById("sub-menu");
        const menuIcon = document.querySelector(".toggle-menu");

        if (!open || !bodyMenu) {
            console.error('Required elements not found');
            return;
        }

        open.addEventListener("click", () => {
            bodyMenu.style.display = this.isOpen ? "none" : "block";
            this.toggleMenuIcon(menuIcon);
            if (submenu) submenu.style.display = this.isOpen ? "block" : "none";
            this.isOpen = !this.isOpen;
        });
    }

    async toggleMenuIcon(menuIcon) {
        let iconToggle;
        if (this.isOpen) {
            iconToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                          </svg>`;
        } else {
            iconToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                          </svg>`;
        }

        menuIcon.innerHTML = iconToggle;
    }

    setupSubMenu() {
        if (!this.submenu || !this.parent) {
            console.error('Error: Submenu elements not found');
            return;
        }

        this.parent.addEventListener('click', () => {
            this.submenu.style.display = "block";
        });
    }

    setupDropdownMenu() {
        const drop = document.getElementById("dropdown-menu");
        const mainMenu = document.getElementById("mainText");
        let showSubMenu = true;

        if (mainMenu && drop) {
            mainMenu.addEventListener('click', () => {
                drop.style.display = showSubMenu ? "block" : "none";
                showSubMenu = !showSubMenu;
            });
        }
    }

    setupCloseMenu() {
        const contentMenu = document.querySelectorAll("#content-menu");
        const drop = document.getElementById("dropdown-menu");

        contentMenu.forEach(clicked => {
            clicked.addEventListener('click', () => {
                drop.style.display = "none";
            });
        });
    }

    setCounter({ isCount = false }) {
        const waitForHtmlResponse = setInterval(() => {
            const item = new ShoppingCardScript();
            const cardCounter = document.querySelector("#card-counter");
            if (isCount) {
                clearInterval(waitForHtmlResponse);

                var count = parseInt(cardCounter.innerText || 0);
                count++;
                item.shippingCardItem(count);
                cardCounter.innerText = count; 
                console.log(count);
            } else {
                console.log(isCount); 
            }
        });
    }
    
}

new Menu();
export default Menu;
