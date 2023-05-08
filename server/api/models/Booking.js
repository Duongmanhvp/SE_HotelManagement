const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    _id: String,
    place: Object,
    userId: mongoose.Schema.Types.ObjectId,
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: Number,
    price: Object,
    paymentType: String,
    payerName: String,
    payerPhone: String,
    feedbacked: Boolean,
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
