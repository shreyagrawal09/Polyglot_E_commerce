const pool = require("../config/db");
const axios = require("axios");

// ✅ Create a new order and store it in PostgreSQL
const createOrder = async (req, res) => {
  const { user_email, products, total_price } = req.body;

  try {
    // ✅ Validate product entries
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    for (const item of products) {
      if (!item.product_id) {
        return res.status(400).json({ message: "Each product must have a product_id" });
      }
    }

    const result = await pool.query(
      `INSERT INTO orders (user_email, products, total_price)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_email, JSON.stringify(products), total_price]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Order insert error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
