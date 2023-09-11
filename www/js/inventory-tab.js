function displayProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    // Retrieve products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((product, index) => {
        const listItem = document.createElement("li");
        const viewButton = document.createElement("button");
        viewButton.textContent = `${product.productName} - $${product.price} - Amount: ${product.amount}`;
        viewButton.onclick = function () {
            viewProduct(index);
        };

        listItem.appendChild(viewButton);
        productList.appendChild(listItem);
    });
}

function viewProduct(index) {
    // Store the selected product index in localStorage
    localStorage.setItem("selectedProductIndex", index);

    // Redirect to the product details page
    window.location.href = "product-details.html";
}

// Display the product list when the page loads
displayProductList();
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuContainer = document.querySelector(".menu-container");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menuContainer.classList.toggle("active");
        menu.classList.toggle("active");
    });

    // Close the menu when clicking anywhere outside of it
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuContainer.classList.remove("active");
            menu.classList.remove("active");
        }
    });
});