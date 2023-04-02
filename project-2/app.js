"use strict";

const btnCart = document.querySelector("#cart-icon");
const closeBtn = document.querySelector(".fa-circle-xmark");
const cart = document.querySelector(".cart");

///Cart appearing
btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});
closeBtn.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

///
document.addEventListener("DOMContentLoaded", loadFood());

function loadFood() {
  loadContent();
}

////////////////
function loadContent() {
  //REMOVE food Item from Cart
  const deleteBtn = document.querySelectorAll("#delete");
  deleteBtn.forEach((btn) => {
    //console.log(btn.parentElement);
    btn.addEventListener("click", removeItem);
  });

  ///product item change event
  const quantityEl = document.querySelectorAll(".cart-quentity");
  quantityEl.forEach((input) => {
    //console.log(btn.parentElement);
    input.addEventListener("change", changeQty);
  });
  //////////////////////product cart
  let addCartBtns = document.querySelectorAll("#add-cart");
  //console.log(addCartBtns);
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", addProduct);
  });

  updateTotal();
}

////////////////////
function removeItem() {
  if (confirm("Are you sure to remove?")) {
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
    console.log(title);
    items = items.filter((el) => el.title != title);
    console.log(items);
    this.parentElement.remove();
    loadContent();
  }
}
///////////////
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
}

let items = [];
//addproduct
function addProduct() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let price = food.querySelector(".food-price").innerHTML;
  let imgSrc = food.querySelector(".food-img").src;

  //////if product already in cart

  let newProduct = { title, price, imgSrc };
  if (items.find((el) => el.title == newProduct.title)) {
    alert("This Product already in Cart!...");
    return;
  } else {
    items.push(newProduct);
  }

  let newProductEl = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductEl;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
     <div class="cart-box">
     <img src="${imgSrc}" class="cart-img">
     <div class="detail-box">
         <div class="cart-food-title">${title}</div>
         <div class="price-box">
             <div class="cart-price">${price}</div>
             <div class="cart-amt">${price}</div>
         </div>
  
         <input type="number" value="1" class="cart-quentity">
     </div>
     <i class="fa-solid fa-trash" id="delete" ></i>
  </div>`;
}

///////////////////////update total

function updateTotal() {
    const cartItems=document.querySelectorAll(".cart-box");
    const totalValue=document.querySelector(".total-price");

    let total=0;
cartItems.forEach((product)=>{
    let priceElement=product.querySelector(".cart-price");
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector(".cart-quentity").value;
    total+=(price*qty);
    product.querySelector(".cart-amt").innerHTML="Rs."+ (price*qty);
    console.log(price,qty,total);
});
totalValue.innerHTML="Rs."+ total;

}
