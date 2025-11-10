import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc auth user & get token
//Route: Post /api/users/login
//Access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    //set JWT as HTTP-Only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
//@desc Register user
//Route: Post /api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});
//@desc logout user/ clear cookie
//Route: Post /api/users/logout
//Access: Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});
//@desc get user profile
//Route: GET /api/users/profile
//Access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});
//@desc Update user profile
//Route: PUT /api/users/profile
//Access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
});
//@desc get user
//Route: GET /api/users
//Access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
//@desc get user by id
//Route: GET /api/users/:id
//Access: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@desc delete user
//Route: DELETE /api/users/:id
//Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc update user
//Route: PUT /api/users/:id
//Access: Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
};
