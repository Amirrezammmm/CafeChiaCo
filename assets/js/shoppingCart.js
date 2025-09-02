
function formatNumberToPersian(num) {
    if (typeof num !== "number" || isNaN(num)) {
        return 0;  
    }
    return num.toLocaleString('fa-IR');
}

function toEnglishDigits(str) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';

  return str.replace(/[۰-۹]/g, d => englishDigits[persianDigits.indexOf(d)]);
}


function parsePrice(priceString) {
  let cleaned = priceString.replace("تومان", "").trim();
  cleaned = toEnglishDigits(cleaned);
  return parseInt(cleaned);
}



function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) return;

    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    cart.items.forEach((item) => {
        item.url = item.url.replace("assets", "..");

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.url}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="inline-box">
                    <p>تعداد: </p>
                    <button class="incdec increase-btn" type="button" data-id="${item.id}">+</button>
                    <p> ${formatNumberToPersian(item.quantity)}</p>
                    <button class="incdec decrease-btn" type="button" data-id="${item.id}">-</button>
                </div>
                <p>قیمت: ${item.price}</p>
            </div>
            <div class="item-actions">
                <button class="remove-from-cart-btn" data-id="${item.id}">حذف</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    if(cart.total===0){
        document.getElementById("total").textContent = "سبد خرید شما خالی است!";
        document.querySelector(".checkout-btn").style.display = "none";
        document.querySelector(".home-btn").textContent = "بازگشت";

    }
    else{
        document.getElementById("total").textContent = `مجموع: ${formatNumberToPersian(cart.total)} تومان`;
    }
}

//handleincrease----------------------
function handleincrease(itemId){
    if(!itemId) return;

    const cart = JSON.parse(localStorage.getItem("cart"));

    const item = cart.items.find(item => item.id === Number(itemId));
    if(item){
        item.quantity +=1;
    }

    cart.total = cart.items.reduce((sum,item)=>{
        return sum + item.quantity * parsePrice(item.price);
    }, 0)
    
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
//---------------------------------------
//handledecrease-------------------------
function handledecrease(itemId) {
    if (!itemId) return;

    const cart = JSON.parse(localStorage.getItem("cart"));

    const itemIndex = cart.items.findIndex(item => item.id === Number(itemId));
    if (itemIndex > -1) {
        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1);
        }
    }

    cart.total = cart.items.reduce((sum, item) => {
        return sum + item.quantity * parsePrice(item.price);
    }, 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
//---------------------------------------
//-------------------------
window.onload = function () {
    const products = JSON.parse(localStorage.getItem("products"));
    const category = JSON.parse(localStorage.getItem("category"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!products || !category || !cart) {
        alert("خطا در بارگذاری داده‌ها. لطفاً صفحه را دوباره بارگذاری کنید.");
        return;
    }
    renderCart();
};

//-------------------------
document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.querySelector(".home-btn");
    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "../../index.html";
        });
    }

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            window.alert("در حال حاضر درگاه پرداخت متصل نمی باشد.");
        });
    }

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("increase-btn")) {
            const itemId = e.target.dataset.id;
            handleincrease(itemId);
        }
        else if (e.target.classList.contains("decrease-btn")) {
            const itemId = e.target.dataset.id;
            handledecrease(itemId);
        }
        else if (e.target.classList.contains("remove-from-cart-btn")) {
            const idToRemove = e.target.dataset.id;
            let cart = JSON.parse(localStorage.getItem("cart"));

            cart.items = cart.items.filter(item => item.id != idToRemove);
            cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
        }
    });
    
    
});
console.log(JSON.parse(localStorage.getItem("cart")));
