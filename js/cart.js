let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// Render cart
function renderCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
        <div class="text-center text-muted py-5">
            <i class="bi bi-cart-x display-3"></i>
            <h5 class="mt-3">Your cart is empty</h5>
            <a href="products.html" class="btn btn-primary mt-2">
                Shop Now
            </a>
        </div>
        `;

        updateSummary();
        return;
    }

    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
        <div class="d-flex align-items-center justify-content-between border-bottom py-3">

            <div class="d-flex align-items-center">

                <img src="${item.image}" width="70" class="me-3 rounded">

                <div>
                    <h6>${item.name}</h6>
                    <p class="text-success mb-0">₹${item.price}</p>
                </div>

            </div>

            <div class="d-flex align-items-center">

                <button class="btn btn-sm btn-outline-secondary me-2"
                    onclick="decreaseQty(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button class="btn btn-sm btn-outline-secondary ms-2"
                    onclick="increaseQty(${item.id})">
                    +
                </button>

            </div>

            <div>
                <strong>₹${item.price * item.quantity}</strong>
            </div>

            <button class="btn btn-danger btn-sm"
                onclick="removeItem(${item.id})">
                <i class="bi bi-trash"></i>
            </button>

        </div>
        `;
    });

    updateSummary();
}

// Increase quantity
function increaseQty(id) {
    let item = cart.find(p => p.id === id);
    item.quantity += 1;

    saveCart();
}

// Decrease quantity
function decreaseQty(id) {
    let item = cart.find(p => p.id === id);

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
}

// Remove item
function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
}

// Save to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Update summary
function updateSummary() {

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let shipping = cart.length > 0 ? 100 : 0;
    let total = subtotal + shipping;

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (totalEl) totalEl.innerText = `₹${total}`;
}

// Cart count in navbar
function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    if (cartCount) {
        cartCount.innerText = count;
    }
}

// Initial load
renderCart();
updateCartCount();