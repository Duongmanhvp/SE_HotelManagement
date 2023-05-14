const Room = require("../models/Room");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const payment = { ...req.body, _id: Date.now(), feedbacked: false };
  try {
    await Booking.create(payment);
    await Room.findByIdAndUpdate(payment.place._id, {
      $push: {
        booked: { check_in: payment.checkIn, check_out: payment.checkOut },
      },
    });
    res.json({ _id: payment._id });
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const payment = await Booking.findOne({ _id: bookingId });
    if (!payment) {
      return res.status(404).send("Payment not found!");
    }
    return res.status(200).json(payment);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };
