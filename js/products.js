const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        category: "Electronics",
        image: "images/product1.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4499,
        category: "Electronics",
        image: "images/product2.jpg"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        category: "Shoes",
        image: "images/product3.jpg"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 3299,
        category: "Electronics",
        image: "images/product4.jpg"
    },
    {
        id: 5,
        name: "T-Shirt",
        price: 799,
        category: "Fashion",
        image: "images/product5.jpg"
    },
    {
        id: 6,
        name : "Apple iphone 17 (white,256 GB)",
        price : 79000,
        category : "Electronics",
        image: "images/product6.jpg"
    },
    {
        id: 7,
        name : "Dell laptop",
        price : 70000,
        category : "Electronics",
        image: "images/product7.jpg"
    },
    {
        id: 8,
        name : "pen",
        price : 9000,
        category : "Accessories",
        image: "images/product8.jpg"
    },
    {
        id: 9,
        name : "keyboard",
        price : 699,
        category : "Electronics",
        image: "images/product9.jpg"
    },
];

// cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

// Render products
function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = `<h4 class="text-center text-muted">No products found</h4>`;
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
        <div class="col-md-4">
            <div class="card shadow">
                <img src="${product.image}" class="card-img-top">

                <div class="card-body">
                    <h5>${product.name}</h5>
                    <p class="text-success fw-bold">₹${product.price}</p>
                    <p class="text-muted">${product.category}</p>

                    <button class="btn btn-primary w-100 mb-2"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <a href="product.html?id=${product.id}"
                        class="btn btn-outline-dark w-100">
                        View Details
                    </a>
                </div>
            </div>
        </div>
        `;
    });
}

// Add to cart
function addToCart(id) {
    let product = products.find(p => p.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}

// Filter + Search + Sort
function filterProducts() {
    let filtered = [...products];

    // search
    let searchText = searchInput.value.toLowerCase();
    if (searchText) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchText)
        );
    }

    // category filter
    let category = categorySelect.value;
    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    // sorting
    let sortValue = sortSelect.value;

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    displayProducts(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);

// Initial load
displayProducts(products);