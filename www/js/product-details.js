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
            <style>

            @import url('https://fonts.googleapis.com/css2?family=Lemon&display=swap');

            h1 {
                color: #E5AF37;
                text-shadow: 4px 4px 4px rgb(211, 65, 77);
                margin: 20px 0;
                font-family: 'Lemon';
                font-style: normal;
                font-weight: 400;
                font-size: px;
                line-height: 52px;
                text-align: center;
                position: relative;
                top: 0;
                left: 0;
            }

            #productDetails {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: auto; 
                max-width: 90%;
                margin: 0 auto;
                border: 1px solid #ccc;
                overflow: auto;
                background: #E7D6AA;
                border-radius: 4px;
                padding: 50px 0;
            }
            
            strong {
                color: #1E1E1E;
                font-family: 'Marko One';
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
            }
            
            /* Style the editable content */
            span[contenteditable="true"] {
                background-color: #3B6A7E;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 5px;
                margin: 5px 0;
                display: inline-block;
                width: 80%;
                height: 30px;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            /* Style the buttons */
            button {

            }

            #saveButton {
                font-family: 'Lemon';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 24px;
                display: flex;
                color: #FFFFFF;
                display: flex;
                width: 100px;
                height: 40px;
                margin-top: 50px;
                background-color: #D3414D;
                justify-content: center;
                align-items: center;
                text-align: center;
                flex: 1;
                margin-right: 20px;
            }
            
            
            /* Style the delete button differently */
            #deleteButton {
                font-family: 'Lemon';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 24px;
                display: flex;
                color: #FFFFFF;
                display: flex;
                width: 100px;
                height: 40px;
                margin-top: 50px;
                background-color: #D3414D;
                justify-content: center;
                align-items: center;
                text-align: center;
                flex: 1;
                margin-left: 20px;
            }
            
            /* Style the error message */
            #error {
                color: #ff3333;
                font-weight: bold;
                margin-top: 10px;
            }

            .button-container {
                display: flex;
                flex-direction: row;
            }
                
            </style>

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