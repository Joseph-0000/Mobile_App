function showProductPopup() {
    const productPopup = document.getElementById('productPopup');
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    // Retrieve products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const selectedProducts = document.getElementById("selectedProducts");

    products.forEach((product, index) => {
        const listItem = document.createElement("li");
        const productItem = document.createElement("div");

        const productName = document.createElement("span");
        productName.textContent = `${product.productName} - $${product.price}`;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.className = "productQuantity";
        quantityInput.value = product.amount;

        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.onclick = function () {
            // Get the updated quantity value from the input field
            let newQuantity = parseInt(quantityInput.value);

            // Calculate the total price based on the updated quantity
            const totalPrice = product.price * newQuantity;

            // Check if the product is already displayed in selectedProducts
            let found = false;
            selectedProducts.querySelectorAll("div").forEach((item) => {
                if (item.textContent.includes(product.productName)) {
                    // Update the quantity if the same product is found
                    const parts = item.textContent.split(" - Total Price: $");
                    if (parts.length === 2) {
                        const oldQuantity = parseInt(parts[0]);
                        newQuantity += oldQuantity;

                        // Create a new selected product element with updated quantity
                        const newTotalPrice = product.price * newQuantity;
                        item.textContent = `${newQuantity} - ${product.productName} - Total Price: $${newTotalPrice}`;

                        // Update the quantity input field in the product list popup
                        quantityInput.value = newQuantity;

                        // Append the "Remove" button if it's not already present
                        if (!item.querySelector("button")) {
                            const removeButton = document.createElement("button");
                            removeButton.textContent = "Remove";
                            removeButton.onclick = function () {
                                const removeQuantity = prompt(`How many ${product.productName} would you like to remove? (Max: ${newQuantity})`);
                                if (removeQuantity !== null) {
                                    const quantityToRemove = parseInt(removeQuantity);
                                    if (!isNaN(quantityToRemove) && quantityToRemove >= 0 && quantityToRemove <= newQuantity) {
                                        // Update the displayed quantity in index.html
                                        newQuantity -= quantityToRemove;
                                        quantityInput.value = newQuantity;
                                        // Remove the old quantity from selectedProducts if new quantity is zero
                                        if (newQuantity === 0) {
                                            selectedProducts.removeChild(item);
                                        } else {
                                            // Update the displayed quantity with the updated quantity
                                            const newTotalPrice = product.price * newQuantity;
                                            item.textContent = `${newQuantity} - ${product.productName} - Total Price: $${newTotalPrice}`;
                                        }
                                    } else {
                                        alert("Invalid input. Please enter a valid quantity to remove.");
                                    }
                                }
                            };
                            item.appendChild(removeButton);
                        }
                    }
                    found = true;
                }
            });

            // If not found, create a new element to display the selected product with quantity and price
            if (!found) {
                const selectedProductItem = document.createElement("div");

                // Create a "Remove" button for this selected product
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = function () {
                    const removeQuantity = prompt(`How many ${product.productName} would you like to remove? (Max: ${newQuantity})`);
                    if (removeQuantity !== null) {
                        const quantityToRemove = parseInt(removeQuantity);
                        if (!isNaN(quantityToRemove) && quantityToRemove >= 0 && quantityToRemove <= newQuantity) {
                            // Update the displayed quantity in index.html
                            newQuantity -= quantityToRemove;
                            quantityInput.value = newQuantity;
                            // Remove the old quantity from selectedProducts
                            selectedProducts.removeChild(selectedProductItem);
                            if (newQuantity > 0) {
                                // Create a new selected product element with updated quantity
                                const newTotalPrice = product.price * newQuantity;
                                selectedProductItem.textContent = `${newQuantity} - ${product.productName} - Total Price: $${newTotalPrice}`;
                                // Append the "Remove" button and the selected product to the selectedProducts div
                                selectedProductItem.appendChild(removeButton);
                                selectedProducts.appendChild(selectedProductItem);
                            }
                        } else {
                            alert("Invalid input. Please enter a valid quantity to remove.");
                        }
                    }
                };

                // Initialize the selected product display
                selectedProductItem.textContent = `${newQuantity} - ${product.productName} - Total Price: $${totalPrice}`;

                // Append the "Remove" button and the selected product to the selectedProducts div
                selectedProductItem.appendChild(removeButton);
                selectedProducts.appendChild(selectedProductItem);
            }
        };

        productItem.appendChild(productName);
        productItem.appendChild(quantityInput);
        productItem.appendChild(addButton);
        listItem.appendChild(productItem);
        productList.appendChild(listItem);
    });
    productPopup.style.display = 'block';
    productPopup.style.backgroundColor = 'red';
}

// Add an event listener to the "Done" button
const doneButton = document.getElementById("doneButton");
doneButton.addEventListener("click", function () {
    // Calculate the total price of selected items
    let totalSelectedPrice = 0;
    const selectedProducts = document.getElementById("selectedProducts");

    selectedProducts.querySelectorAll("div").forEach((item) => {
        const parts = item.textContent.split(" - Total Price: $");
        if (parts.length === 2) {
            totalSelectedPrice += parseFloat(parts[1]);
        }
    });

    // Display the total price in index.html
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Total Price: $${totalSelectedPrice.toFixed(2)}`;

    // Close the productPopup
    const productPopup = document.getElementById('productPopup');
    productPopup.style.display = 'none';
});


