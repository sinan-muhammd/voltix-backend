require("dotenv").config();
const express = require("express");
const connectDB = require("./Database/db");
const carRoute = require("./Routes/evCarRoutes");
const authRoute = require("./Routes/authRoutes");
const bookingRoute = require("./Routes/bookingRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to EV Cars API</h1><p>The server is running correctly.</p>"
  );
});


// Existing Car Routes
app.use("/api/cars", carRoute);

// 👇 ADD AUTH ROUTES
app.use("/api/auth", authRoute);

app.use("/api/bookings", bookingRoute);

const PORT = process.env.PORT || 7000;


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});