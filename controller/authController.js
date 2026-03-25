const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const { generateAccessToken, generateRefreshToken } = require("../Utils/generateToken");

const sendEmail = require("../Utils/sendMail");

// ─── REGISTER ─────────────────────────────────────────
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// ─── LOGIN ───────────────────────────────────────────
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// ─── REFRESH TOKEN ───────────────────────────────────
exports.refreshToken = async (req, res) => {
  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token revoked" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// ─── LOGOUT ──────────────────────────────────────────
exports.logoutUser = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// ─── GET PROFILE ─────────────────────────────────────
exports.getProfile = async (req, res) => {
  res.json(req.user);
};



// ─── GET ALL USERS (ADMIN) ───────────────────────────
exports.getAllUsers = async (req, res) => {

  const users = await User.find({}).select("-password -refreshToken");

  res.json(users);

};



// ─── DELETE USER (ADMIN) ─────────────────────────────
exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (user) {

      await User.deleteOne({ _id: user._id });

      res.json({ message: "User removed successfully" });

    } else {

      res.status(404).json({ message: "User not found" });

    }

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

};



// ─── UPDATE USER ROLE (ADMIN) ────────────────────────
exports.updateUserRole = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (user) {

      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });

    } else {

      res.status(404).json({ message: "User not found" });

    }

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

};



// ─── FORGOT PASSWORD ─────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const html = `
      <h1>Password Reset Request</h1>
      <p>Please click the link below to reset your password. This link is valid for 10 minutes.</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset - Voltix",
      html,
    });

    res.json({
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};





// ─── RESET PASSWORD ──────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
