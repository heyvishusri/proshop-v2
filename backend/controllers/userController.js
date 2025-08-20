import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//@desc auth user & get token
//Route: Post /api/users/login
//Access: Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
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
  updateUser,
};
