const Room = require("../models/Room");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { startOfMonth, startOfWeek, endOfWeek } = require("date-fns");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "CUSTOMER" });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const getAllUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId: userId });
    return res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const getStatistics = async (req, res) => {
  try {
    const curr = new Date();
    const startMonth = startOfMonth(curr);
    const prevWeek = new Date(
      curr.getFullYear(),
      curr.getMonth(),
      curr.getDate() - 7
    );
    const startPrevWeek = startOfWeek(prevWeek);
    const endPrevWeek = endOfWeek(prevWeek);
    const currentMonthBookings = await Booking.find({
      $and: [
        { createdAt: { $gte: startMonth } },
        { createdAt: { $lte: curr } },
      ],
    });
    const currMonthRevenue = currentMonthBookings.reduce(
      (total, currBooking) => total + currBooking.price.totalPrice,
      0
    );
    const roomsNumber = 100;
    const customers = await User.find({ role: { $ne: "ADMIN" } });
    const customerNumber = customers.length;
    const recentPayments = await Booking.find(
      {},
      { _id: 1, price: 1, payerName: 1, createdAt: 1 }
    ).sort({ createdAt: -1 });
    const lastweekPayments = await Booking.aggregate([
      {
        $match: { createdAt: { $gte: startPrevWeek, $lte: endPrevWeek } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: "$price.totalPrice" },
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    res.send({
      currMonthRevenue,
      roomsNumber,
      customerNumber,
      recentPayments,
      lastweekPayments,
    });
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

module.exports = {
  getAllUsers,
  getAllUserBookings,
  getUserById,
  getStatistics,
};
