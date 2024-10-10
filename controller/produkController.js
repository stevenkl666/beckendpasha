import Product from "../models/produkModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil semua produk",
      error: error.message,
    });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil produk",
      error: error.message,
    });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = await Product.create({ name, description, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat produk baru",
      error: error.message,
    });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    await product.update({ name, description, price, stock });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui produk",
      error: error.message,
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    await product.destroy();
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus produk",
      error: error.message,
    });
  }
};
