const express = require("express");
const router = express.Router();

const {
    createBooking,
    getDealerBookings,
    updateBookingStatus,
    getAllBookingsAdmin,
    adminReplyToBooking,
    replyToBooking,
    getUserBookings,
    deleteUserBooking
} = require("../controller/bookingController");

const { protect, admin } = require("../Middleware/authMiddleware");

// Users book test drives
router.post("/book", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);
router.delete("/:id", protect, deleteUserBooking);



// Admins view all leads globally across the platform and can reply
router.get("/admin-leads", protect, admin, getAllBookingsAdmin);
router.put("/:id/admin-reply", protect, admin, adminReplyToBooking);

module.exports = router;
