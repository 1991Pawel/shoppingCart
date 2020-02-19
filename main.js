const cart = [];

const renderProductDom = productArray => {
  if (productArray.length < 0) return;
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = "";

  productArray.forEach(item => {
    let product = document.createElement("div");
    product.innerHTML = `<div id="${item.id}" class="product">
     <img class="product__image" src="${item.srcImg}">
     <h2 class="product__name">${item.name}</h2>
     <h3 class="product__price">${item.price}</h3>
     <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
      </div>`;

    productContainer.appendChild(product);
  });
};

const renderCartDom = () => {
  if (cart.length < 0) return;
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = "";
  cart.forEach(item => {
    let product = document.createElement("div");
    product.innerHTML = `<div id="${item.id}" class="cart__item">
     <img class="cart__item__image" src="${item.srcImg}" alt="fafa">
     <h3 class="cart__item__name">${item.name}</h3>
      <h3 class="cart__item__price">${item.price}</h3>
      <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
      <h3 class="cart__item__quantity">1</h3>
      <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
      </div>`;
    cartContainer.appendChild(product);
  });
};

const listnersForButtons = () => {
  const AddToCartButtons = document.querySelectorAll(
    '[data-action="ADD_TO_CART"]'
  );
  const RemoveFromCartButtons = document.querySelectorAll(
    '[data-action="REMOVE_ITEM"]'
  );

  RemoveFromCartButtons.forEach(btn =>
    btn.addEventListener("click", RemoveFromCartItems)
  );
  AddToCartButtons.forEach(btn =>
    btn.addEventListener("click", AddToCartItems)
  );
};

const getProductId = e => Number(e.target.parentNode.id);

const AddToCartItems = e => {
  const productId = getProductId(e);
  const isAllreadyInCart = cart.some(item => item.id === productId);
  if (isAllreadyInCart) return;

  products.forEach(item => {
    if (item.id === productId) {
      cart.push(item);
    }
  });

  renderCartDom();
  listnersForButtons();
};

const RemoveFromCartItems = e => {
  const productId = getProductId(e);
  const itemIndex = cart.findIndex(item => item.id == productId);
  cart.splice(itemIndex, 1);
  renderCartDom();
  listnersForButtons();
};

window.onload = function() {
  renderProductDom(products);
  renderCartDom();
  listnersForButtons();
};
