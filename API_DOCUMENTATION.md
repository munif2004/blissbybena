# BlissByBena API Documentation

Complete API reference for BlissByBena eCommerce platform.

## Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://your-backend-url.com/api`

## Authentication

Most endpoints require JWT authentication. Include token in headers:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Products Endpoints

### Get All Products
**GET** `/products`

Query Parameters:
- `category` (optional): Filter by category

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Handmade Necklace",
      "description": "Beautiful handmade jewelry",
      "price": 45.99,
      "category": "Jewellery",
      "image": "https://example.com/image.jpg",
      "stock": 10,
      "featured": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### Get Featured Products
**GET** `/products/featured`

Response: Same as Get All Products

### Search Products
**GET** `/products/search?query=necklace`

Query Parameters:
- `query` (required): Search term

Response: Same as Get All Products

### Get Single Product
**GET** `/products/:id`

Response: Single product object (same structure as above)

### Create Product
**POST** `/products`
*Requires authentication*

Request Body:
```json
{
  "name": "Handmade Bracelet",
  "description": "Beautiful handmade bracelet",
  "price": 35.99,
  "category": "Jewellery",
  "image": "https://example.com/image.jpg",
  "images": ["https://example.com/img1.jpg"],
  "stock": 15,
  "featured": true
}
```

Required Fields: name, description, price, category, image

### Update Product
**PUT** `/products/:id`
*Requires authentication*

Request Body: Same as Create Product (partial updates allowed)

### Delete Product
**DELETE** `/products/:id`
*Requires authentication*

Response:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {}
}
```

---

## Orders Endpoints

### Create Order
**POST** `/orders`

Request Body:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "shippingAddress": "123 Main St, City, State 12345",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "productName": "Handmade Necklace",
      "quantity": 2,
      "price": 45.99,
      "total": 91.98
    }
  ],
  "totalPrice": 91.98,
  "notes": "Gift wrapping please"
}
```

Response:
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "orderNumber": "BB-2024-00001",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "totalPrice": 91.98,
    "status": "Pending",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### Get All Orders
**GET** `/orders`
*Requires authentication*

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "orderNumber": "BB-2024-00001",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "items": [...],
      "totalPrice": 91.98,
      "status": "Pending",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### Get Single Order
**GET** `/orders/:id`
*Requires authentication*

Response: Single order object

### Update Order Status
**PUT** `/orders/:id`
*Requires authentication*

Request Body:
```json
{
  "status": "Processing"
}
```

Valid Status Values:
- `Pending`
- `Processing`
- `Shipped`
- `Delivered`
- `Cancelled`

### Delete Order
**DELETE** `/orders/:id`
*Requires authentication*

Response: Confirmation message

---

## Authentication Endpoints

### Register Admin
**POST** `/auth/register`

Request Body:
```json
{
  "email": "admin@blissbybena.com",
  "password": "securepassword123",
  "name": "Admin Name"
}
```

Response:
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@blissbybena.com",
    "name": "Admin Name"
  }
}
```

### Login Admin
**POST** `/auth/login`

Request Body:
```json
{
  "email": "admin@blissbybena.com",
  "password": "securepassword123"
}
```

Response: Same as Register (with token)

### Get Current Admin
**GET** `/auth/me`
*Requires authentication*

Response:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@blissbybena.com",
    "name": "Admin Name",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## Health Check

### Server Status
**GET** `/health`

Response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please fill in all fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

Currently not implemented. Will be added in future versions.

## CORS

CORS is enabled for all origins in development. Update in production.

## Pagination

Pagination not currently implemented. Consider adding for large datasets:
- `?page=1`
- `?limit=10`

## Sorting

Not currently implemented. Consider adding:
- `?sort=createdAt` or `?sort=-createdAt`

## Validation

All inputs are validated using express-validator:
- Product name: Required, max 100 chars
- Email: Valid email format
- Price: Non-negative number
- Category: Must be one of predefined categories

## Database Limits

- Product description: No limit
- Order notes: No limit
- Image URLs: Text fields, no CDN upload yet

---

## Example Usage

### Create a Product (cURL)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Handmade Ring",
    "description": "Gorgeous handmade silver ring",
    "price": 65.00,
    "category": "Jewellery",
    "image": "https://example.com/ring.jpg",
    "stock": 5,
    "featured": true
  }'
```

### Get All Products (JavaScript)

```javascript
const response = await fetch('http://localhost:5000/api/products');
const data = await response.json();
console.log(data.data);
```

### Create Order (JavaScript)

```javascript
const order = {
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
  customerPhone: "+1234567890",
  shippingAddress: "456 Oak St, City, State 54321",
  items: [{
    productId: "507f1f77bcf86cd799439011",
    productName: "Handmade Necklace",
    quantity: 1,
    price: 45.99,
    total: 45.99
  }],
  totalPrice: 45.99
};

const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order)
});

const result = await response.json();
```

---

## Webhook Events

Not currently implemented. Consider adding for:
- Order status changes
- New product uploads
- Stock changes

## Versioning

Current API Version: v1 (not in URL yet)
Future: `/api/v1/products`

---

**Last Updated**: January 2024
**API Status**: Production Ready
