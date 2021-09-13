// load all data from fakestoreapi
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div
                    class="card h-100 border-bottom border-3 border-success border-top-0 border-end-0 border-start-0">
                    <div>
                      <img class="w-100 mx-auto" src='${image}' height="300px" width="300px"></img>
                    </div>
                    <div class="card-body bg-info text-white">
                      <h5 class="card-title">${product.title}</h5>
                      <p>Category: ${product.category}</p>
                      <h5 class="px-5 py-1 rounded-pill bg-success"><i class="fas fa-users "></i> -
                        ${product.rating.count}</h5>
                      <div class="text-warning mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>

                        <span class="py-1 px-3 ms-3 text-white bg-danger rounded-pill">${product.rating.rate}</span>
                      </div>
                      <hr class="m-0" />
                      <h2>Price: $ ${product.price}</h2>
                      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"
                        class="buy-now btn btn-success">add
                        to cart</button>
                      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-danger"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                    </div>
                  </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// create a function for get input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  // Get value from price
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value, isTrue = true) => {
  if (!isTrue) {
    document.getElementById(id).innerText = value.toFixed();
    return;
  }
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

updateTotal();

// show detail function
const showDetails = (id) => {
  const URL = `https://fakestoreapi.com/products/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
};

// product details
const displayDetails = ({
  category,
  description,
  image,
  price,
  rating,
  title,
}) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.textContent = "";
  // console.log(product);

  const div = document.createElement("div");
  div.classList.add("card", "shadow-lg");
  div.innerHTML = `
            <img class="img-fluid" src="${image}" alt="Product-Image">
            <div class="card-body">
              <ul class="list-group list-group-flush p-0">
                <li class="list-group-item"><span class="text-success">Title:</span> ${title}</li>
                <li class="list-group-item"><span class="text-success">Product Desc:</span> ${description}</li>
                <li class="list-group-item"><span class="text-success">Category:</span> ${category}</li>

                <li class="list-group-item"><span class="text-success">Product Price:</span> ${price}</li>
                <li class="list-group-item"><span class="text-success">Average Rating:</span> ${rating.rate}</li>
                <li class="list-group-item"><span class="text-success">Total Rating:</span> ${rating.count}</li>

              </ul>
            </div>
  `;
  modalContainer.appendChild(div);
};

// handle modal alert
const buyProduct = () => {
  const alertModal = document.getElementById("alertModal");
  alertModal.textContent = "";
  const productQuantity = getInputValue("total-Products");
  const message = {};
  // console.log(productQuantity);
  if (productQuantity > 0) {
    message.title = "Hurrah!";
    message.type = "success";
    alertModal.appendChild(alertHTML(message));
    clearCart();
  } else {
    message.title = "Opps!";
    message.type = "fail";
    alertModal.appendChild(alertHTML(message));
  }
};

const clearCart = () => {
  setInnerText("total-Products", 0, false);
  setInnerText("price", 0, false);
  setInnerText("delivery-charge", 20, false);
  setInnerText("total-tax", 0, false);
  setInnerText("total", 0, false);
};

const alertHTML = (alertMessage) => {
  const { title, type } = alertMessage;
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.innerHTML = `
   
                              <div class="modal-header">
                                   <h5 class="modal-title text-center" id="alertModalLabel">${title}</h5>
                                   <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                   <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                  </symbol>
                                  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                  </symbol>
                                </svg>
                                <div class="alert alert-${
                                  type === "success" ? "primary" : "danger"
                                } d-flex align-items-center" role="alert">
                                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#${
                                    type === "success"
                                      ? "check-circle-fill"
                                      : "info-fill"
                                  }"/></svg>
                                  <div>
                                    ${
                                      type === "success"
                                        ? "Congratulations! Successfully placed your order! Thanks."
                                        : "Sorry! You Have No Items In Cart! Please Add Some product. Thanks."
                                    }
                                  </div>
                                </div>
                              <div class="modal-footer">
                                   
                                   <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Okay</button>
                              </div>
                         
  `;
  return div;
};
