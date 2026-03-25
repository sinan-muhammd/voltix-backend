const EvCar = require("../Models/index");



const getAllEvCars = async (req, res, next) => {
  try {
    const cars = await EvCar.find();

    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const addEvCars = async (req, res, next) => {
  try {
    const newCar = req.body;
    console.log("Adding new car:", newCar); // Debug log
    const savedcar = await EvCar.create(newCar);

    res.status(200).json({
      success: true,
      message: "EV cars added successfully",
      data: savedcar,
    });
  } catch (error) {
    next(error);
  }
};

const updateEvCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCar = await EvCar.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCar) {
      return next(new Error("EV Car not found"));
    }

    res.status(200).json({
      success: true,
      message: "EV Car updated successfully",
      data: updatedCar
    });
  } catch (error) {
    next(error);
  }
};

const getsingleEvCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await EvCar.findById(id);

    if (!car) {
      return next(new Error("EV Car not found"));
    }

    res.status(200).json({
      success: true,
      message: "Single EV Car fetched successfully",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCar = await EvCar.findByIdAndDelete(id);

    if (!deletedCar) {
      return next(new Error("EV Car not found"));
    }

    res.status(200).json({
      success: true,
      message: "EV Car deleted successfully",
      data: deletedCar,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getAllEvCars, addEvCars, updateEvCar, getsingleEvCar, deleteEvCar
};
