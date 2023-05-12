const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const roomRouter = require("./api/routes/room.route");
const authRouter = require("./api/routes/auth.route");
const userRouter = require("./api/routes/user.route");
const bookingRouter = require("./api/routes/booking.route");

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// error
app.all("*", (req, res) => {
  res.status(404).send("Request not found! Try again.");
});

app.listen(process.env.PORT_SERVER, () => {
  console.log("server started");
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("Error when connect database."));
});
