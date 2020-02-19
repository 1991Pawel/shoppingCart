const cart = [];

const getProductId = e => Number(e.target.parentNode.id);
const isAllreadyInCart = productId => cart.some(item => item.id === productId);

const countTotalPrice = () => {
  const isEmpty = cart.length > 0 ? false : true;
  if (isEmpty) return;
  const totalPrice = cart.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);
  return totalPrice;
};

const renderTotalCartPriceDom = () => {
  const isEmpty = cart.length > 0 ? false : true;
  const priceContainer = document.querySelector(".cart__total");
  if (isEmpty) {
    priceContainer.style.display = "none";
  } else {
    priceContainer.style.display = "block";
    priceContainer.innerHTML = `Total Price: $ ${countTotalPrice()}`;
  }
};

const renderProductDom = productArray => {
  if (productArray.length < 0) return;
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = "";
  let product = "";
  productArray.forEach(item => {
    product = `<div id="${item.id}" class="product">
     <img class="product__image" src="${item.srcImg}">
     <h2 class="product__name">${item.name}</h2>
     <h3 class="product__price">${item.price}</h3>
     <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
      </div>`;

    productContainer.innerHTML += product;
  });
};

const renderCartDom = () => {
  if (cart.length < 0) return;
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = "";
  let product = "";
  cart.forEach(item => {
    product = `<div id="${item.id}" class="cart__item">
     <img class="cart__item__image" src="${item.srcImg}" alt="fafa">
     <h3 class="cart__item__name">${item.name}</h3>
      <h3 class="cart__item__price">${item.price}</h3>
      <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
      <h3 class="cart__item__quantity">1</h3>
      <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
      </div>`;
    cartContainer.innerHTML += product;
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

const changeButtonStatusInDom = productId => {
  const button = document.querySelector(`[id='${productId}'] button`);
  if (isAllreadyInCart(productId)) {
    button.textContent = "In Cart";
    button.setAttribute("disabled", true);
  } else {
    button.textContent = "Add To Cart";
    button.removeAttribute("disabled");
  }
};

const AddToCartItems = e => {
  const productId = getProductId(e);

  if (isAllreadyInCart(productId)) return;

  products.forEach(item => {
    if (item.id === productId) {
      cart.push(item);
    }
  });

  changeButtonStatusInDom(productId);
  renderCartDom();
  listnersForButtons();
  renderTotalCartPriceDom();
};

const RemoveFromCartItems = e => {
  const productId = getProductId(e);
  const itemIndex = cart.findIndex(item => item.id == productId);
  cart.splice(itemIndex, 1);
  changeButtonStatusInDom(productId);
  renderCartDom();
  listnersForButtons();
  renderTotalCartPriceDom();
};

window.onload = function() {
  renderProductDom(products);
  renderCartDom();
  listnersForButtons();
};
