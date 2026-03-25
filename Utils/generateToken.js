const jwt = require("jsonwebtoken");

/**
 * Generate a short-lived Access Token (15 minutes)
 * Payload: { id, role }
 */
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


/**
 * Generate a long-lived Refresh Token (7 days)
 * Payload: { id }
 */
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
