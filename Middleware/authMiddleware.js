const jwt = require("jsonwebtoken");
const User = require("../Models/User");

/**
 * protect — verifies the short-lived Access Token (15m)
 * Expects: Authorization: Bearer <accessToken>
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password -refreshToken");
            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, token failed or expired" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

/**
 * admin — ensures the authenticated user has role === 'admin'
 */
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, admin };