/* =========================
   SEARCH + FILTER SYSTEM
========================= */

let searchInput = document.getElementById("search");
let categorySelect = document.getElementById("category");
let sortSelect = document.getElementById("sort");

// Run filter
function filterProducts() {

    let filtered = [...products];

    /* =========================
       SEARCH FILTER
    ========================= */
    let searchText = searchInput.value.toLowerCase();

    if (searchText) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchText)
        );
    }

    /* =========================
       CATEGORY FILTER
    ========================= */
    let category = categorySelect.value;

    if (category !== "all") {
        filtered = filtered.filter(product =>
            product.category === category
        );
    }

    /* =========================
       SORTING
    ========================= */
    let sortValue = sortSelect.value;

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    /* =========================
       DISPLAY RESULTS
    ========================= */
    displayProducts(filtered);
}

/* =========================
   EVENT LISTENERS
========================= */

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (categorySelect) {
    categorySelect.addEventListener("change", filterProducts);
}

if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
}