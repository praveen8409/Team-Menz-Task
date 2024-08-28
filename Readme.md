
# Product Management Application Frontend

This is a simple Product Management application built using HTML, CSS, JavaScript, and Bootstrap. The application allows users to manage products, including adding, editing, deleting, and searching for products. The backend API is expected to be hosted locally at `http://localhost:8080/products`.

## Screenshots

### Homepage
![Homepage](Product-Dashboard-client/images/Task%20f.png)


## Features

- **Product Listing**: View a list of all products with details like title, description, price, discounted price, quantity, category, and image.
- **Search Products**: Search products by title or ID.
- **Add Product**: Add a new product to the list with details like title, description, price, discounted price, quantity, category, and image.
- **Edit Product**: Update product details.
- **Delete Product**: Delete a product from the list.
- **Pagination**: Navigate through products using pagination.
- **Modals**: Add, edit, and delete functionalities are handled through Bootstrap modals for a smooth user experience.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, jQuery, Bootstrap
- **Backend**: REST API (not included in this repository, but assumed to be running locally at `http://localhost:8080/products`)

## Getting Started

### Prerequisites

- A local server to serve the static files (e.g., Live Server in VSCode, Python's SimpleHTTPServer, etc.)
- Backend API should be running locally at `http://localhost:8080/products`

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/praveen8409/Team-Menz-Task.git
   cd product-management
2. Open `index.html` in your web browser.

### Notes

- The backend API for managing products (CRUD operations) is expected to be running at `http://localhost:8080/products`. Make sure this API is set up and running before using the application.
- Ensure you have an internet connection to load Bootstrap and jQuery from CDNs.


### Usage

#### Add a Product:
- Click on the "Add Product" button in the navbar.
- Fill in the product details in the modal form and click "Add Product".

#### Edit a Product:
- Click the "Edit" button on a product card.
- Update the product details in the modal form and click "Save Changes".

#### Delete a Product:
- Click the "Delete" button on a product card.
- Confirm the deletion in the modal.

#### Search Products:
- Use the search bar in the navbar to search for products by title or ID.

#### Pagination:
- Navigate through the pages using the pagination controls at the bottom of the page.

### API Endpoints

- **Get Products**: `GET /products`
- **Search Products**: `GET /products/search/{query}`
- **Add Product**: `POST /products`
- **Update Product**: `PUT /products/{productId}`
- **Delete Product**: `DELETE /products/{productId}`

### Scripts

- **main.js**: Contains all the logic for fetching, adding, editing, deleting products, and handling UI interactions.
- **modals.js**: Handles modal functionality and form submissions.

### Customization

- **API Base URL**: Change the `API_BASE_URL` variable in your JavaScript to match your backend server's URL.

```javascript
const API_BASE_URL = 'http://localhost:8080/products';


```

# Product Management System Backend

## Overview

This Spring Boot application is designed to manage products, offering functionality to create, update, delete, search, and display product details. The application leverages RESTful web services, ModelMapper for object mapping, and pagination with sorting.

---

## Project Structure

```plaintext
├── com.menz
│   ├── config
│   │   ├── ProjectConfig.java
│   │   ├── WebConfig.java
│   ├── controllers
│   │   └── ProductController.java
│   ├── dtos
│   │   ├── ApiResponseMessage.java
│   │   ├── PageableResponse.java
│   │   └── ProductDto.java
│   ├── entities
│   │   └── Product.java
│   ├── exceptions
│   │   ├── GlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   ├── helper
│   │   └── Helper.java
│   ├── repositories
│   │   └── ProductRepository.java
│   ├── services
│   │   └── ProductService.java
│   ├── services.impl
│   │   └── ProductServiceImpl.java
│   └── ProductDashboardApplication.java

---
# Product Management System Documentation

## Dependencies

- **Spring Boot Starter Web**: To build web, including RESTful, applications.
- **Spring Boot Starter Data JPA**: To simplify database access.
- **ModelMapper**: For object mapping between DTOs and entities.
- **Lombok**: To reduce boilerplate code such as getters, setters, etc.
- **MySql Database**: For memory DB during development.

## Application Components

### 1. Entities

- **Product**: The primary entity, representing a product with fields like `productId`, `title`, `description`, `price`, `discountedPrice`, `quantity`, `addedDate`, `live`, `stock`, `category`, and `productImageName`.

### 2. DTOs (Data Transfer Objects)

- **ProductDto**: Used for transferring product data between the service and controller layers.
- **PageableResponse**: Wrapper for paginated responses, containing content, pagination details, and metadata like `totalPages`, `totalElements`, etc.
- **ApiResponseMessage**: Standard format for API responses, with fields like `message`, `status`, and `success`.

### 3. Controllers

#### ProductController

Handles all HTTP requests for managing products:

- **POST** `/products`: Create a new product.
- **PUT** `/products/{productId}`: Update an existing product by its ID.
- **DELETE** `/products/{productId}`: Delete a product by its ID.
- **GET** `/products/{productId}`: Retrieve a single product by its ID.
- **GET** `/products/allProducts`: Retrieve all products.
- **GET** `/products`: Retrieve paginated and sorted products.
- **GET** `/products/search/{query}`: Search for products by product ID or title.

### 4. Services

- **ProductService**: Interface that defines operations for managing products.
- **ProductServiceImpl**: Implements `ProductService` and provides logic for creating, updating, deleting, and fetching products.

### 5. Repository

- **ProductRepository**: Extends `JpaRepository` to provide CRUD operations on the `Product` entity, and defines custom query methods like `findByTitleContaining` and `findByProductIdContainingOrTitleContaining`.

### 6. Helper Class

- **Helper**: Provides a utility function `getPageableResponse` to convert `Page` objects into `PageableResponse`.

## Exception Handling

- **GlobalExceptionHandler**: Handles `ResourceNotFoundException` and provides a standardized API response when an exception occurs.

## Configuration

- **ProjectConfig**: Provides the configuration for `ModelMapper`.
- **WebConfig**: Configures CORS to allow cross-origin requests.

## Pagination and Sorting

The application uses pagination and sorting to retrieve product lists:

```java
@GetMapping
public ResponseEntity<PageableResponse<ProductDto>> getAll(
    @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
    @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
    @RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
    @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
)


## Parameters

- **pageNumber**: Specifies which page to retrieve (default is 0).
- **pageSize**: Defines the size of each page (default is 10).
- **sortBy**: Specifies the field to sort by (default is title).
- **sortDir**: Defines the sorting order (default is ascending).

## Running the Application

1. **Clone the repository**.
2. **Navigate to the project directory**.
3. **Run the application** using:

    ```bash
    mvn spring-boot:run
    ```

4. **Access the API** on `http://localhost:8080`.

## Example API Calls

### Create Product

```bash
POST /products
{
  "title": "Sample Product",
  "description": "This is a sample product.",
  "price": 100,
  "discountedPrice": 80,
  "quantity": 10,
  "category": "Electronics"
}

### Update Product

```bash
PUT /products/{productId}
{
  "title": "Updated Product Title",
  "price": 120
}

