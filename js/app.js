let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   CART COUNT (GLOBAL)
========================= */
function updateCartCount() {
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    let cartBadge = document.querySelectorAll("#cart-count");

    cartBadge.forEach(badge => {
        badge.innerText = count;
    });
}

/* =========================
   GET CART DATA
========================= */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* =========================
   SAVE CART DATA
========================= */
function saveCart(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
    cart = cartData;
    updateCartCount();
}

/* =========================
   SHOW TOAST MESSAGE (OPTIONAL UI UPGRADE)
========================= */
function showMessage(message) {
    alert(message); // You can replace this with Bootstrap Toast later
}

/* =========================
   INITIAL LOAD
========================= */
updateCartCount();