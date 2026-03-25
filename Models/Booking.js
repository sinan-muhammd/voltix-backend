const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EvCar",
            required: true,
        },

        bookingDate: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
        },
        dealerReply: {
            type: String,
            default: "",
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
