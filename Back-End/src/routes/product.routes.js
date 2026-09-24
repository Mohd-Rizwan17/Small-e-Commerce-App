import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  productIdValidator,
  productBodyValidator,
  getProductsValidator,
} from "../validators/product.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const router = Router();

router.get("/", getProductsValidator, validate, getProducts);
router.get("/:id", productIdValidator, validate, getProductById);

router.post("/", authenticate, productBodyValidator, validate, createProduct);
router.put(
  "/:id",
  authenticate,
  productIdValidator,
  productBodyValidator,
  validate,
  updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  productIdValidator,
  validate,
  deleteProduct,
);

export default router;
