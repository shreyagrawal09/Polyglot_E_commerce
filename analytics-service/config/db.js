const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// Optional DB connection test
const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL (Analytics Service)");
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
    process.exit(1);
  }
};

// ✅ Export both
module.exports = { connectDB, pool };
