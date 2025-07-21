const express = require("express");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const pool = require("./config/db"); // this initializes the pool

dotenv.config();

const app = express();
app.use(express.json());

// Simple DB test
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("❌ PostgreSQL connection error:", err);
  } else {
    console.log("✅ Connected to PostgreSQL (Order Service)");
  }
});

// Routes
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`🚀 Order Service running on port ${PORT}`);
});
