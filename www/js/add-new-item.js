function addProduct() {
    // Get input values
    const productName = document.getElementById("productName").value;
    const amount = parseInt(document.getElementById("amount").value);
    const price = document.getElementById("price").value;
    const lowStockWarning = document.getElementById("lowStockWarning").value;
    const currentDate = new Date().toLocaleDateString();

    // Create a product object
    const product = {
        productName,
        amount,
        price,
        lowStockWarning
    };

    const historyEntry = {
        productName: productName,
        amount: amount,
        date: currentDate,
        type: "newitem" // Type indicating an addition to stock
    };
    // Retrieve existing products from localStorage or create an empty array
    const products = JSON.parse(localStorage.getItem("products")) || [];
    // Retrieve the existing history from localStorage
    const history = JSON.parse(localStorage.getItem("history")) || [];

    // Add the new product to the array
    products.push(product);
    // Add the history entry to the list
    history.push(historyEntry);

    // Save the updated product list to localStorage
    localStorage.setItem("products", JSON.stringify(products));  

    // Save the updated history list to localStorage
    localStorage.setItem("history", JSON.stringify(history));

    // Clear the form
    document.getElementById("productForm").reset();
}