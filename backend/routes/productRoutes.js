import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct); // Fetch all products
router.route("/:id").get(getProductById).put(protect, admin, updateProduct); // Fetch product by ID

export default router;
