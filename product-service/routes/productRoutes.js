const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById, // 👈 Add this import
} = require("../controllers/productController");

const router = express.Router();

// 🔸 POST /api/products → Add a product
router.post("/", createProduct);

// 🔸 GET /api/products → Fetch all products
router.get("/", getAllProducts);

// 🔸 GET /api/products/:id → Fetch product by ID
router.get("/:id", getProductById); // 👈 Add this route

module.exports = router;
