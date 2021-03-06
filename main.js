let cart = [];
if (JSON.parse(localStorage.getItem("cart")) !== null) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

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
      <h3 class="cart__item__quantity">${item.quantity ? item.quantity : 1}</h3>
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

  const increaseQuantityButton = document.querySelectorAll(
    '[data-action="INCREASE_ITEM"]'
  );
  const decreseQuantityButton = document.querySelectorAll(
    '[data-action="DECREASE_ITEM"]'
  );

  increaseQuantityButton.forEach(btn => {
    btn.addEventListener("click", updateQuantity);
  });

  decreseQuantityButton.forEach(btn => {
    btn.addEventListener("click", updateQuantity);
  });

  RemoveFromCartButtons.forEach(btn =>
    btn.addEventListener("click", RemoveFromCartItems)
  );

  AddToCartButtons.forEach(btn =>
    btn.addEventListener("click", AddToCartItems)
  );
};

const updateQuantity = e => {
  const handleButtons = e.target.dataset.action;
  const productId = getProductId(e);
  const itemIndex = cart.findIndex(item => item.id == productId);
  const quantity = document.querySelector(
    `[id='${productId}'] .cart__item__quantity`
  );

  if (handleButtons === "DECREASE_ITEM") {
    if (quantity.textContent <= 1) {
      RemoveFromCartItems(e);
      return;
    }

    quantity.textContent--;
    let storeData = JSON.parse(localStorage.getItem("cart"));
    storeData[itemIndex].quantity = quantity.textContent;
    localStorage.setItem("cart", JSON.stringify(storeData));
  } else if (handleButtons === "INCREASE_ITEM") {
    quantity.textContent++;

    let storeData = JSON.parse(localStorage.getItem("cart"));
    storeData[itemIndex].quantity = quantity.textContent;
    localStorage.setItem("cart", JSON.stringify(storeData));
  }
};

const changeButtonStatusInDom = (productId = null) => {
  if (productId === null) {
    cart.forEach(item => {
      const button = document.querySelector(`[id='${item.id}'] button`);
      button.setAttribute("disabled", true);
      button.textContent = "In Cart";
    });
  } else {
    const button = document.querySelector(`[id='${productId}'] button`);
    if (isAllreadyInCart(productId)) {
      button.textContent = "In Cart";
      button.setAttribute("disabled", true);
    } else {
      button.textContent = "Add To Cart";
      button.removeAttribute("disabled");
    }
  }
};

const AddToCartItems = e => {
  const productId = getProductId(e);

  if (isAllreadyInCart(productId)) return;

  products.forEach(item => {
    if (item.id === productId) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
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

  // local storange
  const storeData = JSON.parse(localStorage.getItem("cart"));
  storeData.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(storeData));
  //

  cart.splice(itemIndex, 1);

  changeButtonStatusInDom(productId);
  renderCartDom();
  listnersForButtons();
  renderTotalCartPriceDom();
};

window.onload = function(e) {
  renderProductDom(products);
  renderCartDom();
  listnersForButtons();
  changeButtonStatusInDom();
  renderTotalCartPriceDom();
};
