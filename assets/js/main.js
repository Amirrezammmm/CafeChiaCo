let category = [
  { name: "نوشیدنی گرم", id: "0" },
  { name: "نوشیدنی سرد", id: "1" },
  { name: "لاته", id: "2" },
  { name: "آب میوه", id: "3" },
  { name: "آیس کافی", id: "4" }
];

let products = [
  { id: 0, name: "قهوه ترک", category_id: "0", price: "۴۵۰۰۰تومان", url: "assets/img/turkish coffee.jpg" },
  { id: 1, name: "اسپرسو ", category_id: "0", price: "۵۵۰۰۰تومان", url: "assets/img/Espresso.jpg" },
  { id: 2, name: "کاپوچینو ", category_id: "0", price: "۶۵۰۰۰تومان", url: "assets/img/cappochino.jpg" },
  { id: 3, name: "چای ماسالا", category_id: "0", price: "۶۰۰۰۰تومان", url: "assets/img/masala.jpg" },
  { id: 4, name: "موهیتو ", category_id: "1", price: "۷۵۰۰۰تومان", url: "assets/img/mojito.jpg" },
  { id: 5, name: "نوشابه کلاسیک", category_id: "1", price: "۲۵۰۰۰تومان", url: "assets/img/soft.jpg" },
  { id: 6, name: "لیموناد نعنا ", category_id: "1", price: "۶۵۰۰۰تومان", url: "assets/img/mint.jpg" },
  { id: 7, name: "آب گازدار طعم‌دار", category_id: "1", price: "۵۰۰۰۰تومان", url: "assets/img/water.jpg" },
  { id: 8, name: "وانیل لاته", category_id: "2", price: "۷۵۰۰۰تومان", url: "assets/img/vanilla.jpg" },
  { id: 9, name: "کارامل لاته", category_id: "2", price: "۸۰۰۰۰تومان", url: "assets/img/caramel.jpg" },
  { id: 10, name: "دارچین لاته", category_id: "2", price: "۷۵۰۰۰تومان", url: "assets/img/cinnamon.jpg" },
  { id: 11, name: "آیس لاته کلاسیک", category_id: "2", price: "۷۰۰۰۰تومان", url: "assets/img/icedlatte.jpg" },
  { id: 12, name: "آب پرتقال طبیعی", category_id: "3", price: "۷۰۰۰تومان", url: "assets/img/orange.jpg" },
  { id: 13, name: "آب انار تازه", category_id: "3", price: "۸۵۰۰۰تومان", url: "assets/img/pomegranate.jpg" },
  { id: 14, name: "توت‌فرنگی و موز", category_id: "3", price: "۹۰۰۰۰تومان", url: "assets/img/Strawberries.jpg" },
  { id: 15, name: "آب سیب سبز", category_id: "3", price: "۷۵۰۰۰تومان", url: "assets/img/apple.jpg" },
  { id: 16, name: "آیس آمریکانو", category_id: "4", price: "۶۵۰۰۰تومان", url: "assets/img/ice americano.jpg" },
  { id: 17, name: "آیس موکا", category_id: "4", price: "۸۰۰۰۰تومان", url: "assets/img/mocha.jpg" },
  { id: 18, name: "آیس کارامل ماکیاتو", category_id: "4", price: "۸۵۰۰۰تومان", url: "assets/img/machiato.jpg" },
  { id: 19, name: "آیس اسپرسو با شیر نارگیل", category_id: "4", price: "۹۰۰۰۰تومان", url: "assets/img/ice.jpg" }
];
let cart = {
  items: [],
  total: 0
};
// Check if cart exists in localStorage---------------------
window.onload = function () {

  renderCartButtonValue();

  let content = document.getElementById("tab-content");
  let categoryCards = document.querySelectorAll(".category-card");

  function renderProductsByCategory(catId = null) {
    content.innerHTML = "";

    const filteredProducts = catId === null
      ? products
      : products.filter(p => p.category_id === catId);

    filteredProducts.forEach((product) => {
      let productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.url}" alt="تصویر محصول">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}</p>
      `;

      let button = document.createElement("button");
      button.className = "add-to-cart-btn";
      button.textContent = "افزودن به سبد خرید";
      button.addEventListener("click", function () {
        addToCart(product.id);
      });
      productCard.appendChild(button);

      content.appendChild(productCard);
    });

  }

  categoryCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      categoryCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      if (index === 0) {
        renderProductsByCategory(null);
      } else {
        renderProductsByCategory((index - 1).toString());
      }
    });
  });

  categoryCards[0].classList.add("active");
  renderProductsByCategory(null);
};

//----------------------------------------------------------------
const header = document.querySelector('header');
const placeholder = document.createElement('div');

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const stickyPoint = 200;

  if (scrollY > stickyPoint && !header.classList.contains("sticky")) {
    placeholder.style.height = `${header.offsetHeight}px`;
    header.parentNode.insertBefore(placeholder, header);
    header.classList.add("sticky");
  } else if (scrollY <= stickyPoint && header.classList.contains("sticky")) {
    header.classList.remove("sticky");
    if (placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
  }
});
//----------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Search Functionality
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("searchResults");

  results.innerHTML = "";
  if (input.trim() === "") {
    results.classList.add("hidden");
    return;
  }
// ---------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Filter products based on the search input
  const filtered = products.filter(p => p.name.toLowerCase().includes(input));

  if (filtered.length === 0) {
    results.innerHTML = "<li style='padding: 0.5rem; text-align: center; color: #777;'>محصولی یافت نشد</li>";
  } else {
    filtered.forEach(product => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${product.url}" alt="${product.name}">
        <div class="product-info">
          <span class="name">${product.name}</span>
          <span class="price">${product.price}</span>
        </div>
        <button class="add-btn" onclick="addToCart(${product.id})">افزودن</button>
      `;
      results.appendChild(li);
    });
  }

  results.classList.remove("hidden");
}
//---------------------------------------------------------------------------------


function toEnglishDigits(str) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';

  return str.replace(/[۰-۹]/g, d => englishDigits[persianDigits.indexOf(d)]);
}
//----------------------------------------------------------------------------

function parsePrice(priceString) {
  let cleaned = priceString.replace("تومان", "").trim();
  cleaned = toEnglishDigits(cleaned);
  return parseInt(cleaned);
}
//--------------------------------------------------------------------------------

function formatNumberToPersian(num) {
    if (num === null || num === undefined) {
        return 0;  // مقدار پیش‌فرض برای مواقعی که عدد نداریم
    }
    return Number(num).toLocaleString('fa-IR');
}

//------------------------------------------------------------------------------------

// Function to add a product to the cart----------------------------------------------
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    alert("محصول یافت نشد!");
    return;
  }
  let quantity = 0;
  const numericPrice = parsePrice(product.price);
  if(cart.items.some(item => item.id === product.id)) {
    cart.items = cart.items.map(item => {
      if(item.id === product.id) {
        quantity = item.quantity ? item.quantity + 1 : 1;
        return { ...item, quantity: quantity };
      }
      return item;
    }); 
  }
  else{
    cart.items.push({ ...product, quantity: 1 });
  }
  
  cart.total += numericPrice;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartButtonValue();

  alert(`محصول "${product.name}" به سبد خرید اضافه شد!`);
}
//---------------------------------------------------------------------------------------

document.querySelector(".cart-button").addEventListener("click", function () {
  if(cart.items.length === 0) {
    alert("سبد خرید شما خالی است!");
    return;
  }
  else{
    window.location.href = "/assets/pages/shoppingCart.html";
  }
});

function renderCartButtonValue(){
  let cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    document.querySelector(".cart-count").textContent = cart.items.length;
  if(cart.total === 0) {
    document.querySelector(".cart-total").textContent = "";
  } else {
    document.querySelector(".cart-total").textContent = formatNumberToPersian(cart.total) + " تومان";
    document.querySelector(".cart-total").style.width = "100px";
  }
  }
}

const cartButton = document.querySelector('.cart-button');
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("category", JSON.stringify(category));
console.log(JSON.parse(localStorage.getItem("cart")));
console.log(document.querySelector(".cart-total"));

