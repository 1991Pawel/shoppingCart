const cart = [];

const displayProductInDom = (productsItems,querySelector) => {
  if(productsItems.length < 0) return;

  const productContainer = document.querySelector(querySelector);
  productContainer.innerHTML = "";

  productsItems.forEach(item => {
    let product = document.createElement('div');
 
  if(productsItems === cart){
    product.innerHTML = `<div id="${item.id}" class="cart__item">
    <img class="cart__item__image" src="${item.srcImg}" alt="fafa">
    <h3 class="cart__item__name">${item.name}</h3>
    <h3 class="cart__item__price">${item.price}</h3>
    <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
    <h3 class="cart__item__quantity">1</h3>
    <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
    <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
  </div>`
    
  }else if (productsItems === products){
    product.innerHTML = `<div id="${item.id}" class="product">
        <img class="product__image" src="${item.srcImg}">
        <h2 class="product__name">${item.name}</h2>
        <h3 class="product__price">${item.price}</h3>
        <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
        </div>` 
        console.log('wszedlem')
    };
    productContainer.appendChild(product);
  });
};



listnersForButtons = () => {
  const AddToCartButtons = document.querySelectorAll('[data-action="ADD_TO_CART"]');
  const RemoveFromCartButtons = document.querySelectorAll('[data-action="REMOVE_ITEM"]');

  RemoveFromCartButtons.forEach((btn) => btn.addEventListener('click', RemoveFromCartItems));
  AddToCartButtons.forEach((btn) => btn.addEventListener('click', AddToCartItems));  
}

const getProductId = e => Number(e.target.parentNode.id);


  const AddToCartItems = (e) => {
  const productId = getProductId(e);
  const isAllreadyInCart = cart.some(item => item.id === productId);
  if(isAllreadyInCart) return;
  
  products.map(item => {
        if (item.id === productId) {
          cart.push(item);
        }
      });

  displayProductInDom(cart, '.cart');
  listnersForButtons();

}

const RemoveFromCartItems = (e) => {
  const productId = getProductId(e);
  const itemIndex = cart.findIndex(item => item.id == productId);
  cart.splice(itemIndex, 1);
  displayProductInDom(cart, '.cart');
    listnersForButtons();
}



window.onload = function() {
  displayProductInDom(products,'.products');
  displayProductInDom(cart, '.cart');
  listnersForButtons();
};
