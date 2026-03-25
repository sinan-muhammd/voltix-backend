const express = require("express");
const { getAllEvCars, addEvCars, updateEvCar, getsingleEvCar, deleteEvCar } = require("../controller/evcars");
const { protect, admin } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllEvCars)
// Admin generic add
router.post("/", protect, admin, addEvCars)
router.put("/:id", protect, admin, updateEvCar)
router.get("/:id", getsingleEvCar)
router.delete("/:id", protect, admin, deleteEvCar)

module.exports = router;