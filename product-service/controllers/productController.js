const Product = require("../models/Product");

// POST /api/products - Add a product
const createProduct = async (req, res) => {
  try {
    const { name, brand, price, countInStock, description, category } = req.body;

    const product = new Product({
      name,
      brand,
      price,
      countInStock,
      description,
      category,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products - Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/products/:id - Fetch product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById, // ← don't forget to export this
};
