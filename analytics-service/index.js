const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db"); // ✅ import correctly from db.js
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Health check route
app.get("/test", (req, res) => {
  res.send("✅ Analytics API is working");
});

// ✅ Mount analytics routes under /api
app.use("/api", analyticsRoutes);

// ✅ Connect DB and start server
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Analytics Service running on port ${PORT}`);
});
