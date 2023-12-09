async function getProducts() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Achra-f/iCodeThis/main/projects/icodemas6/products.json");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching JSON data", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("container");

  products.forEach((product) => {
    // add parent div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // add child divs
    // add title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("product__title");
    titleDiv.textContent = product.name;
    // add price
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("product__price");
    priceDiv.textContent = `$${product.price}`;
    // add discount label
    if (product.discount) {
      const discountLabel = document.createElement("span");
      discountLabel.textContent = `-${product.discount}%`;
      discountLabel.classList.add("discount-label");
      productDiv.appendChild(discountLabel);
    }
    // add new label
    if (product.new) {
      const newLabel = document.createElement("span");
      newLabel.textContent = "New";
      newLabel.classList.add("new-label");
      productDiv.appendChild(newLabel);
    }

    // add imagery
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = product.image;
    img.alt = product.name;

    // add to cart
    const addToCartBtn = document.createElement('div');
    addToCartBtn.textContent = 'Add to cart';
    addToCartBtn.classList.add('product__btn');
    addToCartBtn.addEventListener('click', () => handleAddToCartClick(addToCartBtn));

    // added to cart
    const addedToCartMsg = document.createElement('div');
    addedToCartMsg.textContent = 'Added to cart';
    addedToCartMsg.classList.add('product__added');

    // append child div
    productDiv.appendChild(img);
    productDiv.appendChild(titleDiv);
    productDiv.appendChild(priceDiv);
    productDiv.appendChild(addToCartBtn);
    productDiv.appendChild(addedToCartMsg);

    container.appendChild(productDiv);
  });
}

function handleAddToCartClick(button) {
  const parentProduct = button.closest('.product');
  const addToCartBtn = parentProduct.querySelector('.product__btn');
  const addedToCartMsg = parentProduct.querySelector('.product__added');

  // Toggle visibility of the button and message
  addToCartBtn.style.display = 'none';
  addedToCartMsg.style.display = 'block';

  // Optional: You can add further logic here, e.g., update cart state, trigger animations, etc.
}


getProducts().then((products) => {
  renderProducts(products.products);
});
