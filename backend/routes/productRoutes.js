import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getProducts).post(protect, admin, createProduct); // Fetch all products
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(checkObjectId, protect, admin, updateProduct)
  .delete(checkObjectId, protect, admin, deleteProduct); // Fetch product by ID
router.route("/:id/reviews").post(checkObjectId, protect, createProductReview); // Create product review
export default router;
