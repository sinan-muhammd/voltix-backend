const Booking = require("../Models/Booking");
const EvCar = require("../Models/index");
const sendEmail = require("../Utils/sendMail");

// @desc    User: Create a new Test Drive Booking
// @route   POST /api/bookings/book
// @access  Private/User
exports.createBooking = async (req, res) => {
    const { carId, bookingDate, message, dealerId } = req.body;

    try {
        const car = await EvCar.findById(carId);
        if (!car) return res.status(404).json({ message: "Car not found" });

        const booking = await Booking.create({
            user: req.user._id,
            car: carId,
            brand: car.brand,
            bookingDate,
            message,
        });

        res.status(201).json({ message: "Test Drive booked successfully", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// @desc    Admin: View Every Booking Globally
// @route   GET /api/bookings/admin-leads
// @access  Private/Admin
exports.getAllBookingsAdmin = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate("user", "name email")
            .populate("car", "name brand price images")
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching global leads." });
    }
};



// @desc    Admin: Reply to any Test Drive Booking (Override)
// @route   PUT /api/bookings/:id/admin-reply
// @access  Private/Admin
exports.adminReplyToBooking = async (req, res) => {
    const { reply } = req.body;

    try {
        const booking = await Booking.findById(req.params.id).populate("user", "name email");
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Admins can bypass the brand ownership check
        booking.dealerReply = reply;
        const updatedBooking = await booking.save();

        if (booking.user && booking.user.email) {
            const message = `
                <h3>Hello ${booking.user.name},</h3>
                <p>The administrator has replied to your booking request.</p>
                <p><strong>Reply:</strong> <br/> ${reply}</p>
            `;
            sendEmail({
                to: booking.user.email,
                subject: "Reply to your Test Drive Booking",
                html: message
            }).catch(emailError => {
                console.error("Failed to send email to user in background:", emailError);
            });
        }

        const fullyPopulatedBooking = await Booking.findById(updatedBooking._id)
            .populate("user", "name email")
            .populate("car", "name brand price images");

        res.json(fullyPopulatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Server Error sending admin reply." });
    }
};

// @desc    User: Get My Test Drives
// @route   GET /api/bookings/my-bookings
// @access  Private/User
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate("car", "name brand price images")
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching user bookings." });
    }
};

// @desc    User: Cancel/Delete a Test Drive Booking
// @route   DELETE /api/bookings/:id
// @access  Private/User
exports.deleteUserBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Make sure the user owns the booking before deleting
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this booking" });
        }

        await Booking.findByIdAndDelete(req.params.id);

        res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error cancelling booking." });
    }
};
