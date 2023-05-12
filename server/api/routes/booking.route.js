const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/booking.controller");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:bookingId", getBookingById);

module.exports = router;
