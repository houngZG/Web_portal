import ProductDetailScript from "./product_details.js";

class ContentLoader {
    constructor() {
        this.json = "./data.json";
        this.lengthData = 0;
        this.startItem = 0;
        this.end = 8;
    }


    loadContent(url, scriptUrl) {
        const watingHTML = setInterval(() => {
            const contentContainer = document.getElementById('content');
            if(contentContainer){
                clearInterval(watingHTML);

                fetch(url)
                .then(response => response.text())
                .then(data => {
                    contentContainer.innerHTML = data;
                    if (scriptUrl) {
                        this.loadScript(scriptUrl, () => {
                            if (url.includes('furniture.html')) {
                                this.fetchData();
                                this.clickTile();
                                this.clickPage();
                            }
                        });
                    }
                })
                .catch(error => console.error('Error fetching content:', error));
            }
        }, 100);
    }

    loadScript(scriptUrl, callback) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = callback;
        script.onerror = () => console.error(`Error loading script: ${scriptUrl}`);
        document.head.appendChild(script);
    }

    fetchData(start = 0, end = 8) {
        fetch(this.json)
            .then(response => response.json())
            .then(datas => {
                const furnituresHTML = document.querySelector(".parent-card");

                if (!furnituresHTML) {
                    console.error('Error: .parent-card element not found');
                    return;
                }

                let getData = "";
                const l = datas.data.furnitures;
                this.lengthData = l.length;
                console.log(this.lengthData);

                if (this.startItem < 0) {
                    this.startItem = 0;
                    end = 8;
                }

                if (end >= this.lengthData) {
                    end = this.lengthData;
                }

                l.slice(start, end).forEach(item => {
                    getData += `
                        <div class="card product-card" id="card-product-${item.id}">
                            <img class="card-img-top" src="${item.image}" alt="${item.product_name}" />
                            <div class="card-text name-card text-start p-1 p-sm-1 p-md-2 p-lg-3 p-xl-3 p-xxl-3">
                                <ul class="list">
                                    <li class="title">${item.product_name}</li>
                                    <li>Product order list: 00${item.id}</li>
                                    <li>Rating: ${this.generateStars(item.rating)}</li>
                                    <li>Price: ${item.price}</li>
                                    <li>Discount: ${item.discount}</li>
                                </ul>
                            </div>
                        </div>
                    `;
                });
                furnituresHTML.innerHTML = getData;

                //load data into products screen
                this.loadProductDetail(l, start, end);

            })
            .catch(error => console.error("Error fetching data:", error));
    }

    clickTile() {
        const tiles = document.querySelectorAll('.txt');
        tiles.forEach(tile => {
            tile.addEventListener('click', function () {
                console.log('Tile clicked:', this);
            });
        });
    }

    loadProductDetail(products, start, end) {
        products.slice(start, end).forEach(item => {
            const cardProduct = document.getElementById(`card-product-${item.id}`);
            cardProduct.addEventListener('click', function (event) {
                event.preventDefault();
                const url = './view/product_details.html';
                const script = './scripts/product_details.js';
                const json = JSON.stringify(item);
                const data = new ProductDetailScript();
                data.renderProductDetails(json);
                this.loadContent(url, script);
            }.bind(this));
        });
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="${i <= rating ? 'star-active' : 'star-unactive'} bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
        }
        return stars;
    }

    clickPage() {
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
}

new ContentLoader();
export default ContentLoader;


