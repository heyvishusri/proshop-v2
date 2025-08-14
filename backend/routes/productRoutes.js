import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  getProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(asyncHandler(getProduct)); // Fetch all products
router.route("/:id").get(asyncHandler(getProductById)); // Fetch product by ID

export default router;
