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

const updateUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = userSchema.validate(newUser);
    if (result.error) {
      return res.status(400).send("Not valid request data! Try again.");
    }
    await User.updateOne({ _id: newUser._id }, newUser);
    return res.status(200).json({
      _id: req.body._id,
      ...newUser,
    });
  } catch (error) {
    return res.status(500).send("Server error! Try again.");
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).send("Delete user successfully!");
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const newPassword = req.body.newPassword;
  if (newPassword.length < 8 || newPassword.length > 24) {
    return res.status(400).send("Not valid request data! Try again.");
  }
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { password: newPassword } }
    );
    return res.status(200).send("Update password successfully.");
  } catch (error) {
    return res.status(500).send("Server error! Try again." + error.message);
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
  updateUser,
  getAllUserBookings,
  getUserById,
  getStatistics,
  updatePassword,
  deleteUser,
};
