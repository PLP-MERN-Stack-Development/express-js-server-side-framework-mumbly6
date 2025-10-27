//sreadme.md
📘 Overview

A RESTful API built with Express.js that supports standard CRUD operations for products, includes authentication, middleware, error handling, and advanced features such as filtering, pagination, and product statistics.

🚀 Features

Full CRUD for /api/products

Request logging middleware

API key authentication (x-api-key header)

Input validation middleware

Centralized error handling

Filtering, pagination, and search

Product statistics by category

🛠 Setup Instructions
1. Clone the Repository
git clone <your-github-repo-url>
cd express-api

2. Install Dependencies
npm install

3. Environment Variables

Create a .env file using the provided example:

cp .env.example .env


Add your values:

PORT=3000
API_KEY=mysecret123

4. Run the Server
node server.js


Server runs on http://localhost:3000.

📡 API Endpoints
Base URL
http://localhost:3000/api/products

Endpoints
Method	Endpoint	Description	Body Example
GET	/api/products	List all products	—
GET	/api/products/:id	Get product by ID	—
POST	/api/products	Create new product	{ "name": "Book", "description": "A novel", "price": 15.99, "category": "Fiction", "inStock": true }
PUT	/api/products/:id	Update existing product	{ "price": 18.99 }
DELETE	/api/products/:id	Delete product by ID	—
GET	/api/products?category=Fiction	Filter by category	—
GET	/api/products?search=book	Search by name	—
GET	/api/products?page=1&limit=5	Paginate results	—
GET	/api/products/stats	Get count by category	—
🔑 Authentication

All /api/products endpoints require an API key header:

x-api-key: mysecret123


Without this header → 401 Unauthorized.

🧩 Middleware
Name	Purpose
logger.js	Logs method, URL, timestamp
auth.js	Validates API key
validateProduct.js	Checks product fields and types
errorHandler.js	Handles and formats all errors
🧪 Testing

Use Postman, Insomnia, or curl.

Example:

curl -X POST http://localhost:3000/api/products \
  -H "x-api-key: mysecret123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Book","description":"A novel","price":15.99,"category":"Fiction","inStock":true}'

⚙️ Project Structure
express-api/
│
├── controllers/
│   └── productsController.js
├── errors/
│   └── customErrors.js
├── middleware/
│   ├── auth.js
│   ├── logger.js
│   ├── validateProduct.js
│   └── errorHandler.js
├── models/
│   └── products.js
├── routes/
│   └── products.js
├── .env.example
├── server.js
└── README.md

✅ Expected Output

Properly structured JSON responses

Consistent HTTP status codes

Secure access via API key

Advanced features (filter, paginate, search, stats) functioning correctly