require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("User Service is running...");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
