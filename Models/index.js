const mongoose = require("mongoose");

const evCarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    range: {
      type: Number,
      required: true,
    },

    efficiency: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    acceleration: {
      type: Number,
    },


    brand: {
      type: String,
      required: true,
      enum: [
        "Audi", "BMW", "Mercedes", "Tesla", "Porsche", "Hyundai", "Kia", "Volvo", "Tata", "Mahindra", "MG", "BYD"
      ],

    },


    battery: {
      type: String,
      required: true,
    },

    fastCharger: {
      type: Boolean,
      default: false,
    },

    towing: {
      type: Number,
      default: 0,
    },

    topSpeed: {
      type: Number,
      default: 0,
    },

    motor: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },



    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvCar", evCarSchema);
