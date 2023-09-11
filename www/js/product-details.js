function displayProductDetails() {
    const productDetails = document.getElementById("productDetails");

    // Retrieve the selected product index from localStorage
    const selectedProductIndex = localStorage.getItem("selectedProductIndex");

    if (selectedProductIndex !== null) {
        // Retrieve products from localStorage
        const products = JSON.parse(localStorage.getItem("products")) || [];

        // Check if the selected index is valid
        if (selectedProductIndex >= 0 && selectedProductIndex < products.length) {
            const selectedProduct = products[selectedProductIndex];

            // Display product details with editable fields
            productDetails.innerHTML = `

                <link rel="stylesheet" href="./css/product-details.css">

                <strong>Product Name:</strong> <span contenteditable="true" id="productName">${selectedProduct.productName || '~'}</span><br>
                <strong>Amount:</strong> <span contenteditable="true" id="amount">${selectedProduct.amount || '~'}</span><br>
                <strong>Buy Price:</strong> $<span contenteditable="true" id="price">${selectedProduct.price || '~'}</span><br>
                <strong>Low Stock Warning:</strong> <span contenteditable="true" id="lowStockWarning">${selectedProduct.lowStockWarning || '~'}</span><br>
                <div class = "button-container">
                <button id="saveButton" onclick="saveProduct()">Save</button>
                <button id="deleteButton" onclick="deleteProduct()">Delete</button>
                <div/>
            `;

            return;
        }
    }

    // If no product is selected or the index is invalid, display an error message
    productDetails.innerHTML = "Product not found.";
}

function saveProduct() {
    const selectedProductIndex = localStorage.getItem("selectedProductIndex");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (selectedProductIndex !== null) {
        if (selectedProductIndex >= 0 && selectedProductIndex < products.length) {
            // Update product data with the edited values
            products[selectedProductIndex].productName = document.getElementById("productName").textContent;
            products[selectedProductIndex].amount = document.getElementById("amount").textContent;
            products[selectedProductIndex].price = parseFloat(document.getElementById("price").textContent);
            products[selectedProductIndex].lowStockWarning = document.getElementById("lowStockWarning").textContent;

            // Save the updated product list to localStorage
            localStorage.setItem("products", JSON.stringify(products));
        }
    }
}

function deleteProduct() {
    const selectedProductIndex = localStorage.getItem("selectedProductIndex");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (selectedProductIndex !== null) {
        if (selectedProductIndex >= 0 && selectedProductIndex < products.length) {
            // Remove the selected product from the product list
            products.splice(selectedProductIndex, 1);

            // Save the updated product list to localStorage
            localStorage.setItem("products", JSON.stringify(products));

            // Redirect back to the main page
            window.location.href = "index.html";
        }
    }
}

// Display the product details when the page loads
displayProductDetails();