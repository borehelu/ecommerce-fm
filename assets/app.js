const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close_modal");
const currentPicture = document.querySelector(".product_image");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const prevSliderBtn = document.querySelector(".prevSlider");
const nextSliderBtn = document.querySelector(".nextSlider");
const sliderCurrentImage = document.getElementById("slider-image");
const sliderThumbnails = document.querySelectorAll(".product_thumbnail");
const currentImage = document.getElementById("currentImg");
const thumbnails = document.querySelectorAll(".thumbnail");
const showCart = document.querySelector(".cart_btn");
const cart = document.querySelector(".cart_container");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const quantityText = document.querySelector(".quantity_text");
const discounted_price = document.querySelector(".discounted_price");
const checkoutBtn = document.querySelector(".checkout_btn");
const toggleNav =  document.querySelector(".toggle_nav");
const nav = document.querySelector("nav");
const closeNav = document.querySelector(".close_nav");

let currentIndex = 0;
let price = 250;
let discount = 50;
let quantity = 0;
let discountedPrice = (price * 50) / 100;

const productImages = [
  {
    image: "assets/images/image-product-1.jpg",
    thumbnail: "assets/images/image-product-1-thumbnail.jpg",
  },
  {
    image: "assets/images/image-product-2.jpg",
    thumbnail: "assets/images/image-product-2-thumbnail.jpg",
  },
  {
    image: "assets/images/image-product-3.jpg",
    thumbnail: "assets/images/image-product-3-thumbnail.jpg",
  },
  {
    image: "assets/images/image-product-4.jpg",
    thumbnail: "assets/images/image-product-4-thumbnail.jpg",
  },
];

let shoppingCart = [];

toggleNav.onclick = ()=>{
  nav.classList.toggle('show');
}

closeNav.onclick = ()=>{
  nav.classList.remove('show');
}

showCart.onclick = () => {
  cart.classList.toggle("show");
};

sliderCurrentImage.onclick = () => {
  modal.classList.remove("hide");
  modal.classList.add("show");
};

closeModal.onclick = () => {
  modal.classList.remove("show");
  modal.classList.add("hide");
};

nextBtn.onclick = () => {
  if (currentIndex === productImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  updateCurrentImage(currentIndex, currentImage, thumbnails);
};

prevBtn.onclick = () => {
  if (currentIndex === 0) {
    currentIndex = productImages.length - 1;
  } else {
    currentIndex -= 1;
  }
  updateCurrentImage(currentIndex, currentImage, thumbnails);
};

nextSliderBtn.onclick = () => {
  if (currentIndex === productImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  updateCurrentImage(currentIndex, sliderCurrentImage, sliderThumbnails);
};

prevSliderBtn.onclick = () => {
  if (currentIndex === 0) {
    currentIndex = productImages.length - 1;
  } else {
    currentIndex -= 1;
  }
  updateCurrentImage(currentIndex, sliderCurrentImage, sliderThumbnails);
};

thumbnails.forEach((thumbnail, index) => {
  thumbnail.onclick = () => {
    currentIndex = index;
    updateCurrentImage(currentIndex, currentImage, thumbnails);
  };
});

sliderThumbnails.forEach((thumbnail, index) => {
  thumbnail.onclick = () => {
    currentIndex = index;
    updateCurrentImage(currentIndex, sliderCurrentImage, sliderThumbnails);
  };
});

plusBtn.onclick = () => {
  quantityText.innerHTML = ++quantity;
  total = (discountedPrice * quantity).toFixed(2);
  discounted_price.innerHTML = `$${total}`;
};

minusBtn.onclick = () => {
  if (quantity > 0) {
    quantityText.innerHTML = --quantity;
    total = (discountedPrice * quantity).toFixed(2);
    discounted_price.innerHTML = `$${total}`;
  }
};

checkoutBtn.onclick = () => {
  if (quantity > 0) {
    shoppingCart.push({
      productName: "fall limited edition sneakers",
      quantity: quantity,
      discountedPrice: discountedPrice,
      total: total,
      thumbnail: "assets/images/image-product-1-thumbnail.jpg",
    });

    updateCart();
  }
};

function updateCurrentImage(index, element, thumbnails) {
  element.setAttribute("src", productImages[index].image);
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });
  thumbnails[index].classList.add("active");
}

function updateCart() {
  let output = "";
  shoppingCart.forEach((cart, index) => {
    output += `
      <div class="item">
          <img src="${cart.thumbnail}" class="item_thumbnail" alt="thumbnail">
          <div class="item_description">
              <p class="item_name">${cart.productName}</p>
              <p class="item_price">$${cart.discountedPrice} x ${cart.quantity} <span class="item_total">$${cart.total}</span></p>
              
          </div>
          <button class="item_remove" onclick="removeItem(${index})">
              <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
          </button>
      </div>   
      `;
  });

  output += `<button class="checkout">checkout</button>`;
  document.querySelector(".empty-cart").style.display = "none";
  if (shoppingCart.length === 0) {
    output = "";
    document.querySelector(".empty-cart").style.display = "block";
  }
  document.querySelector(".cart_list").innerHTML = output;
}

function removeItem(index) {
  shoppingCart = shoppingCart.filter((item, i) => {
    return index !== i;
  });
  updateCart();
}
