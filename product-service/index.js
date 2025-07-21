require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 6969;

// 🛠 Middleware to parse JSON
app.use(express.json());

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔄 Mount routes
app.use("/api/products", productRoutes);

// 🌐 Test endpoint
app.get("/", (req, res) => {
  res.send("Product Service is running...");
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
