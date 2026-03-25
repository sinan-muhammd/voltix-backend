const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
  forgotPassword,
  resetPassword
} = require("../controller/authController");

const { protect, admin } = require("../Middleware/authMiddleware");


// ───────── PUBLIC ROUTES ─────────


// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get new access token using refresh token
router.post("/refresh-token", refreshToken);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.put("/reset-password/:token", resetPassword);



// ───────── PROTECTED ROUTES ─────────

// Logout
router.post("/logout", protect, logoutUser);

// Get user profile
router.get("/profile", protect, getProfile);



// ───────── ADMIN ROUTES ─────────

// Get all users
router.get("/users", protect, admin, getAllUsers);

// Delete user
router.delete("/users/:id", protect, admin, deleteUser);

// Update user role
router.put("/users/:id/role", protect, admin, updateUserRole);

module.exports = router;
