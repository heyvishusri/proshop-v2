import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

// Export the router to be used in the main app

export default router;
