function showProductPopup() {
    const productPopup = document.getElementById('productPopup');
    productPopup.style.display = "flex";
    productPopup.style.flexDirection = "column";
    productPopup.style.alignItems = "center";
    productPopup.style.justifyContent = "center"
    const productList = document.getElementById("productList");
    productList.style.padding = "4px 24px";
    const searchInput = document.getElementById("searchInput");
    const doneButton = document.getElementById("doneButton");
    doneButton.style.justifySelf = "center";
    doneButton.style.backgroundColor = "#D3414D";
    productList.innerHTML = "";

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.justifyContent = "center";

    // Retrieve products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const selectedProducts = document.getElementById("selectedProducts");

    products.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.style.margin = "16px 0";
        const productItem = document.createElement("div");
        productItem.style.display = "flex";
        const productName = document.createElement("span");
        productName.style.fontFamily = "Marko One";
        productName.style.flex = "2";
        productName.textContent = `${product.productName} - $${product.price}`;
        const quantityInput = document.createElement("input");
        quantityInput.style.fontFamily = "Marko One";
        quantityInput.style.height = "24px";
        quantityInput.style.backgroundColor = "#3B6A7E";
        quantityInput.style.flex = "1";
        quantityInput.type = "number";
        quantityInput.className = "productQuantity";
        quantityInput.value = product.amount;
        quantityInput.max = product.amount; // Set max quantity equal to the inventory quantity


        const addButton = document.createElement("button");
        addButton.style.height = "32px";
        addButton.style.flex = "1";
        addButton.style.fontFamily = "Marko One";
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
                        if (newQuantity > product.amount) {
                            // Ensure the quantity doesn't exceed the inventory amount
                            newQuantity = product.amount;
                            alert(`The remaining amount of ${product.productName} is ${product.amount} `);
                        }

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
                                        // Remove the old quantity from selectedProducts if the new quantity is zero
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
                selectedProductItem.style.display = "flex";
                selectedProductItem.style.padding = "8px";
                selectedProductItem.style.alignItems = "center";

                // Create a "Remove" button for this selected product
                const removeButton = document.createElement("button");
                removeButton.style.fontFamily = "Marko One";
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
    productPopup.style.backgroundColor = '#E7D6AA';

    // Add an event listener to the search input
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach((product, index) => {
            const listItem = productList.children[index];
            if (product.productName.toLowerCase().includes(searchTerm)) {
                listItem.style.display = "block";
            } else {
                listItem.style.display = "none";
            }
        });
    });

    // Show the "Done" button after filtering
    doneButton.style.display = 'block';
}





// Add an event listener to the "Done" button
const doneButton = document.getElementById("doneButton");
doneButton.addEventListener("click", function () {
    // Calculate the total price of selected items
    let totalSelectedPrice = 0;
    const selectedProducts = document.getElementById("selectedProducts");
    const productPopup = document.getElementById('productPopup');

    selectedProducts.querySelectorAll("div").forEach((item) => {
        const parts = item.textContent.split(" - Total Price: $");
        if (parts.length === 2) {
            totalSelectedPrice += parseFloat(parts[1]);
        }
    });

    // Display the total price in index.html
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Total Price: $${totalSelectedPrice.toFixed(2)}`;
    productPopup.style.display ='none';
    
    // Show the payment form
    const paymentForm = document.getElementById("paymentForm");
    paymentForm.style.display = 'flex';
    paymentForm.style.flexDirection = "column";
    paymentForm.style.justifyContent = "center";
    paymentForm.style.alignItems = "center";
});

// Add an event listener to the "Calculate Change" button
const calculateChangeButton = document.getElementById("calculateChangeButton");
calculateChangeButton.addEventListener("click", function () {
    const paymentAmountInput = document.getElementById("paymentAmount");
    const paymentAmount = parseFloat(paymentAmountInput.value);
    if (isNaN(paymentAmount) || paymentAmount < 0) {
        alert("Invalid payment amount. Please enter a valid amount.");
        return;
    }

    const totalSelectedPrice = parseFloat(document.getElementById("totalPrice").textContent.split("$")[1]);
    const change = paymentAmount - totalSelectedPrice;
    const changeElement = document.getElementById("change");
    changeElement.textContent = `Change: $${change.toFixed(2)}`;

    // Show the payment form after calculating the change
    const paymentForm = document.getElementById("paymentForm");
    paymentForm.style.display = "flex";
});

// Define a function to save the transaction and update the inventory
function saveTransaction() {
    // Retrieve the transaction details
    const selectedProducts = document.getElementById("selectedProducts");
    const totalSelectedPrice = document.getElementById("totalPrice").textContent;
    const paymentAmountInput = document.getElementById("paymentAmount");
    const paymentAmount = parseFloat(paymentAmountInput.value);
    
    // Create a transaction object
    const transaction = {
        date: new Date().toLocaleDateString(),
        products: [],
        totalPrice: totalSelectedPrice,
        paymentAmount: paymentAmount.toFixed(2), // Include payment amount
        change: (paymentAmount - parseFloat(totalSelectedPrice.split("$")[1])).toFixed(2) // Include change
    };

    selectedProducts.querySelectorAll("div").forEach((item) => {
        const parts = item.textContent.split(" - Total Price: $");
        if (parts.length === 2) {
            const productName = parts[0].split(" - ")[1];
            const quantity = parseInt(parts[0].split(" - ")[0]);
            const price = parseFloat(parts[1]);
            transaction.products.push({ productName, quantity, price });
        }
    });

    // Save the transaction details to localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Update the inventory after the transaction
    const products = JSON.parse(localStorage.getItem("products")) || [];
    selectedProducts.querySelectorAll("div").forEach((item) => {
        const parts = item.textContent.split(" - Total Price: $");
        if (parts.length === 2) {
            const productName = parts[0].split(" - ")[1];
            const quantity = parseInt(parts[0].split(" - ")[0]);

            // Find the corresponding product in the inventory and update its quantity
            const inventoryProduct = products.find((product) => product.productName === productName);
            if (inventoryProduct) {
                inventoryProduct.amount -= quantity;
            }
        }
    });

    // Save the updated inventory
    localStorage.setItem("products", JSON.stringify(products));

    // Clear the transaction on the index.html
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = "";
    const paymentForm = document.getElementById("paymentForm");
    paymentForm.style.display = "none";

    // Clear the selected products display
    selectedProducts.innerHTML = "";

    // Clear the payment input and change display
    paymentAmountInput.value = "";
    const changeElement = document.getElementById("change");
    changeElement.textContent = "";

    // Display a success message
    alert("Transaction saved successfully!");
}

// Add an event listener to the "Save Transaction" button
const saveTransactionButton = document.getElementById("saveTransactionButton");
saveTransactionButton.addEventListener("click", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the saveTransaction function
    saveTransaction();
});

// Function to clear saved transactions
function clearTransactions() {
    localStorage.removeItem("transactions");
    alert("Saved transactions have been cleared.");
}

// Add an event listener to the "Clear Saved Transactions" button
const clearTransactionsButton = document.getElementById("clearTransactionsButton");
clearTransactionsButton.addEventListener("click", function () {
    // Call the clearTransactions function to remove saved transactions
    clearTransactions();
});

// HAMBURGER MENU
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

