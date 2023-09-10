function addProduct() {
    // Get input values
    const productName = document.getElementById("productName").value;
    const amount = document.getElementById("amount").value;
    const price = document.getElementById("price").value;
    const lowStockWarning = document.getElementById("lowStockWarning").value;

    // Create a product object
    const product = {
        productName,
        amount,
        price,
        lowStockWarning
    };

    // Retrieve existing products from localStorage or create an empty array
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the array
    products.push(product);

    // Save the updated product list to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Clear the form
    document.getElementById("productForm").reset();
}