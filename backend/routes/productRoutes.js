import express from "express";
const router = express.Router();
import products from "../data/products.js";

router.get("/", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

export default router;
