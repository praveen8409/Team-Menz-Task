$(document).ready(function () {
    let currentPage = 0;
    let pageSize = 10;

    // Fetch and display products
    function loadProducts() {
        fetchProducts(currentPage, pageSize)
            .then(response => {
                displayProducts(response.content);
                setupPagination(response.pageNumber, response.totalPages);
            })
            .catch(handleError);
    }

    // Display products in the UI
    function displayProducts(products) {
        const productList = $('#productList');
        productList.empty();
        products.forEach(product => {
            const imageUrl = product.productImageName.startsWith('http')
                ? product.productImageName
                : `path/to/${product.productImageName}`;

            productList.append(`
            <div class="col-md-4 mb-4">
                <div class="card">
                     <img src="${imageUrl}" class="card-img-top" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Discounted Price: $${product.discountedPrice}</p>
                        <p class="card-text">Quantity: ${product.quantity}</p>
                        <p class="card-text">Category: ${product.category}</p>
                        <button class="btn btn-primary edit-btn" data-id="${product.productId}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${product.productId}">Delete</button>
                    </div>
                </div>
            </div>
        `);
        });

        // Attach event handlers for edit and delete buttons
        $('.edit-btn').on('click', function () {
            const productId = $(this).data('id');
            openEditModal(productId);
        });

        $('.delete-btn').on('click', function () {
            const productId = $(this).data('id');
            openDeleteModal(productId);
        });
    }


    // Setup pagination buttons
    function setupPagination(currentPage, totalPages) {
        const pagination = $('#pagination');
        pagination.empty();

        for (let i = 0; i < totalPages; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            pagination.append(`
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="#" data-page="${i}">${i + 1}</a>
                </li>
            `);
        }

        // Attach event handler for pagination buttons
        $('.page-link').on('click', function (e) {
            e.preventDefault();
            currentPage = $(this).data('page');
            loadProducts();
        });
    }

    // Open the edit modal and load product details
    function openEditModal(productId) {
        fetchProductById(productId)
            .then(product => {
                $('#edit-product-id').val(product.productId);
                $('#edit-title').val(product.title);
                $('#edit-description').val(product.description);
                $('#edit-price').val(product.price);
                $('#edit-discounted-price').val(product.discountedPrice);
                $('#edit-quantity').val(product.quantity);
                $('#edit-category').val(product.category);
                $('#edit-product-image').val(product.productImageName);
                $('#edit-live').prop('checked', product.live);
                $('#edit-stock').prop('checked', product.stock);
                $('#editProductModal').modal('show');
            })
            .catch(handleError);
    }

    // Open the delete confirmation modal
    function openDeleteModal(productId) {
        $('#confirmDelete').data('id', productId);
        $('#deleteProductModal').modal('show');
    }

    // Handle form submission for adding a new product
    $('#addProductForm').on('submit', function (e) {
        e.preventDefault();

        const product = {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            price: $('#edit-price').val(),
            discountedPrice: $('#edit-discounted-price').val(),
            quantity: $('#edit-quantity').val(),
            addedDate: $('#edit-addedDate').val(),
            live: $('#edit-live').is(':checked'),
            stock: $('#edit-stock').is(':checked'),
            productImageName: $('#edit-product-image').val(),
            category: $('#edit-category').val()  // Make sure this is correct
        };
        console.log('Update payload:', product);

        addProduct(product)
            .then(() => {
                $('#addProductModal').modal('hide');
                loadProducts();
            })
            .catch(handleError);
    });

    // Handle form submission for updating a product
    $('#editProductForm').on('submit', function (e) {
        e.preventDefault();

        const productId = $('#edit-product-id').val();
        const product = {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            price: $('#edit-price').val(),
            discountedPrice: $('#edit-discounted-price').val(),
            quantity: $('#edit-quantity').val(),
            addedDate: $('#edit-addedDate').val(),
            live: $('#edit-live').is(':checked'),
            stock: $('#edit-stock').is(':checked'),
            productImageName: $('#edit-product-image').val(),
            category: $('#edit-category').val()  // Make sure this is correct
        };
        console.log('Update payload:', product);


        updateProduct(productId, product)
            .then(() => {
                $('#editProductModal').modal('hide');
                loadProducts();
            })
            .catch(handleError);
    });

    // Handle delete confirmation
    $('#confirmDelete').on('click', function () {
        const productId = $(this).data('id');

        deleteProduct(productId)
            .then(() => {
                $('#deleteProductModal').modal('hide');
                loadProducts();
            })
            .catch(handleError);
    });

    // Handle search functionality
    $('#searchInput').on('input', function () {
        const query = $(this).val();
        if (query) {
            searchProductsByTitleOrId(query)
                .then(response => {
                    displayProducts(response.content);
                    setupPagination(response.pageNumber, response.totalPages);
                })
                .catch(handleError);
        } else {
            loadProducts();
        }
    });


    // Initial load of products
    loadProducts();
});
