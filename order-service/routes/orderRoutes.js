const express = require("express");
const { createOrder, getOrdersByEmail } = require("../controllers/orderController");

const router = express.Router();

// POST /api/orders - create a new order
router.post("/", createOrder);

// GET /api/orders/:email - fetch orders by email
router.get("/:email", getOrdersByEmail);

module.exports = router;
