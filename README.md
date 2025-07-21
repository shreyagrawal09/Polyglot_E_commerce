# 🛍️ Polyglot Microservices-Based E-commerce Platform

A fully functional backend system for an e-commerce platform using microservices architecture with **polyglot persistence** — different databases for different services.

> ✅ Docker is skipped in this version for simplicity.

---

## 🚀 Project Overview

This project is built with **Node.js** and follows microservices architecture. Each service is responsible for a specific business domain and can scale independently. Communication is done via REST APIs.

---

## ✅ Progress Tracker

- [x] User Service (PostgreSQL + JWT Auth)
- [x] Product Service (MongoDB)
- [x] Order Service (PostgreSQL + Inter-service communication)
- [x] Analytics Service (Top products API)
- [ ] Redis Cache Service (Skipped for now)
- [ ] Docker Integration
- [ ] Unit Testing with Jest

---

## 🧱 Microservices Breakdown

### 1. 👤 User Service
- **Database:** PostgreSQL
- **Features:**
  - User registration with password hashing
  - JWT authentication
  - Login endpoint
  - Protected profile route
- **Port:** `5000`

### 2. 📦 Product Service
- **Database:** MongoDB
- **Features:**
  - Add new product
  - Get product details by ID
- **Port:** `6969`

### 3. 🧾 Order Service
- **Database:** PostgreSQL
- **Features:**
  - Place order with user email and products
  - Fetch orders by email
  - Calls Product Service to enrich order product details
- **Port:** `7070`

### 4. 📊 Analytics Service
- **Database:** PostgreSQL
- **Features:**
  - Get top 5 most ordered products
- **Port:** `8080`

---

## 📁 Technologies Used

- Node.js
- Express.js
- PostgreSQL (`pg`)
- MongoDB (`mongoose`)
- JWT (jsonwebtoken)
- Bcrypt (password hashing)
- Axios (inter-service communication)
- Dotenv (env management)

---

## ⚙️ Setup Instructions (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/polyglot-ecomm.git
   cd polyglot-ecomm
   ```

2. **Set up each service separately**

   - Navigate into a service directory (e.g., `user-service/`)
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with your DB and JWT config (see sample below)
   - Run the service:
     ```bash
     npm run dev
     ```

3. **.env Example (for PostgreSQL services)**

   ```env
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=postgres
   PG_PASSWORD=yourpassword
   PG_DATABASE=userdb
   JWT_SECRET=your_jwt_secret
   ```

---

## 🧪 API Testing

Use Postman, Thunder Client, or any REST client:

- **Register User:** `POST /api/users/register`
- **Login User:** `POST /api/users/login`
- **Get Profile:** `GET /api/users/profile` (requires token)
- **Add Product:** `POST /api/products`
- **Get Product:** `GET /api/products/:id`
- **Place Order:** `POST /api/orders`
- **Get Orders:** `GET /api/orders/:email`
- **Top Products:** `GET /api/top-products`

---

## 📸 Screenshots

> *(Add Postman response screenshots or UI images if available)*

---

## 🙌 Acknowledgements

This project was built as part of a learning initiative to demonstrate:
- Microservices architecture
- Inter-service communication
- Polyglot persistence
- Clean backend development

---

## 📬 Contact

Feel free to connect:

**Author:** Shrey Agrawal  
**GitHub:** [@shreyagrawal](https://github.com/your-username)
