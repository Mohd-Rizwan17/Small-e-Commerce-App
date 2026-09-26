import Product from "../models/product.model.js";

const isOwner = (product, user) =>
  product.createdBy.toString() === user._id.toString();

export const createProduct = async (req, res) => {
  const { name, image, description, price, stock } = req.body;

  const product = await Product.create({
    name,
    image,
    description,
    price,
    stock,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};

export const getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const [products, total] = await Promise.all([
    Product.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy", "name"),
    Product.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "createdBy",
    "name",
  );

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, product });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (!isOwner(product, req.user)) {
    return res.status(403).json({
      success: false,
      message: "You can only update your own products",
    });
  }

  const { name, image, description, price, stock } = req.body;

  product.name = name;
  product.image = image;
  product.description = description ?? "";
  product.price = price;
  product.stock = stock;
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (!isOwner(product, req.user)) {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own products",
    });
  }

  await product.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
};
