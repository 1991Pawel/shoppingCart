const cart = [];

const displayProductInDom = products => {
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = "";
  products.forEach(item => {
    const itemHtml = `<div id="${item.id}" class="product">
        <img class="product__image" src="${item.srcImg}">
        <h2 class="product__name">${item.name}</h2>
        <h3 class="product__price">${item.price}</h3>
        <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
    </div>`;
    productContainer.innerHTML += itemHtml;
  });
};

const listnersForAddButtons = () => {
  const AddToCartButtons = document.querySelectorAll(
    '[data-action="ADD_TO_CART"]'
  );
  AddToCartButtons.forEach(btn => {
    btn.addEventListener("click", clickedIdProduct);
  });
};

const clickedIdProduct = e => {
  const productId = Number(e.target.parentNode.id);
  addProductToCart(productId);

  cart.forEach(item => {
    if (item.id !== productId) {
      console.log("zmien na disable false");
      e.target.setAttribute("disabled", false);
      e.target.textContent = "In Cart";
    } else {
      console.log("zmien na disable true");
      e.target.setAttribute("disabled", true);
      e.target.textContent = "Add To Cart";
    }
  });
};

const addProductToCart = productId => {
  const isAllreadyInCart = cart.some(item => item.id === productId);
  if (isAllreadyInCart) return;

  products.map(item => {
    if (item.id === productId) {
      cart.push(item);
    }
  });
  showCartItemsInDom(cart);
};

const listnersForRemoveButtons = () => {
  const removeFromCartButtons = document.querySelectorAll(
    '[data-action="REMOVE_ITEM"]'
  );

  removeFromCartButtons.forEach(btn =>
    btn.addEventListener("click", removeCartItem)
  );
};

const removeCartItem = e => {
  const removeItem = e.target.parentNode;
  DomElement = document.getElementById(removeItem.id);

  const button = (DomElement.querySelector("button").disabled = false);
  button.textContent = "Add To Cart";

  removeItem.remove();
  const productId = Number(e.target.parentNode.id);
  const itemIndex = cart.findIndex(item => item.id == productId);
  cart.splice(itemIndex, 1);
};

showCartItemsInDom = cart => {
  if (cart.length) {
    const cartContainer = document.querySelector(".cart");
    cartContainer.innerHTML = "";
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart__item");
      cartItem.id = item.id;
      cartItem.innerHTML = `<img class="cart__item__image" src="${item.srcImg}" alt="fafa">
        <h3 class="cart__item__name">${item.name}</h3>
        <h3 class="cart__item__price">${item.price}</h3>
        <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
        <h3 class="cart__item__quantity">1</h3>
        <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
        <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>`;
      cartContainer.appendChild(cartItem);
    });
    listnersForRemoveButtons();
  }
};

showCartItemsInDom(cart);
displayProductInDom(products);
listnersForAddButtons();
