const {pool} = require("../config/db");

const getTopProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        jsonb_array_elements(products) ->> 'product_id' AS product_id,
        COUNT(*) AS order_count
      FROM orders
      GROUP BY product_id
      ORDER BY order_count DESC
      LIMIT 5;
    `);

    res.status(200).json({
      message: "Top products fetched",
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ Error fetching top products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getTopProducts };
