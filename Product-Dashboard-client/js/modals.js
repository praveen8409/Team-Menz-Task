const API_BASE_URL = 'http://localhost:8080/products';

// Utility function to make API requests
async function apiRequest(url, method, data) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// Fetch all products
async function fetchProducts(pageNumber = 0, pageSize = 10, sortBy = 'title', sortDir = 'asc') {
    const url = `${API_BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
    console.log()
    return apiRequest(url, 'GET');
}



// Search products by title
async function searchProductsByTitleOrId(query, pageNumber = 0, pageSize = 10, sortBy = 'title', sortDir = 'asc') {
    const url = `${API_BASE_URL}/search/${query}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
    return apiRequest(url, 'GET');
}


// Add a new product
async function addProduct(product) {
    const url = API_BASE_URL;
    return apiRequest(url, 'POST', product);
}

// Update an existing product
async function updateProduct(productId, product) {
    const url = `${API_BASE_URL}/${productId}`;
    console.log('API URL:', url);  // Check the URL
    

    return apiRequest(url, 'PUT', product)
        .then(response => {
            console.log('Update response:', response);  // Log the API response
            return response;
        })
        .catch(error => {
            console.error('Update failed:', error);  // Log any errors
            throw error;
        });
}

// Delete a product
async function deleteProduct(productId) {
    const url = `${API_BASE_URL}/${productId}`;
    return apiRequest(url, 'DELETE');
}

// Utility function to handle errors
function handleError(error) {
    console.error('API error:', error);
    // alert('An error occurred. Please try again.');

}
