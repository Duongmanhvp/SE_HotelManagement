const express = require("express");
const {
  getAllUsers,
  getAllUserBookings,
  getUserById,
  getStatistics,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId/bookings", getAllUserBookings);
router.get("/:userId", getUserById);
router.get("/admin/statistics", getStatistics); // statistic (admin)

module.exports = router;
