document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector(".txt");
  console.log("Script loaded");

  function fetchData() {
    fetch("../data.json")
      .then((response) => response.json())
      .then((datas) => {
        let furnituresHTML = document.querySelector(".parent-card");
        let getData = "";
        let l = datas.data.furnitures;

        l.forEach((item) => {
          getData += `
            <div class="card product-card">
              <img
                class="card-img-top image-item-list"
                src="${item.image}"
                alt="${item.product_name}"
              />
              <div class="card-text name-card text-start p-1 p-sm-1 p-md-2 p-lg-3 p-xl-3 p-xxl-3">
                <ul class="list">
                  <li class="title">${item.product_name}</li>
                  <li>Rating: ${generateStars(item.rating)}</li>
                  <li>Price: ${item.price}</li>
                  <li>Discount: ${item.discount}</li>
                </ul>
              </div>
            </div>
          `;
        });
        furnituresHTML.innerHTML = getData;
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="${i <= rating ? 'star-active' : 'star-unactive'} bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>`;
    }
    return stars;
  }

  console.log('furniture.js: DOM fully loaded and parsed');
    const contentContainer = document.querySelector('#furniture');
    console.log(contentContainer);  // Check if the element is found

    // If contentContainer is found, proceed with your script logic
    if (contentContainer) {
        // Your script logic that modifies contentContainer
        // Example:
        contentContainer.innerHTML = '<p>New content loaded!</p>';
    } else {
        console.error('Error: #furniture element not found');
    }
  fetchData();
  loadContent('view/furniture.html');

});


