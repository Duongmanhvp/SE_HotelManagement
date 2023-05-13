const express = require("express");
const {
  getAllUsers,
  getAllUserBookings,
  getUserById,
  getStatistics,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.put("/", updateUser);
router.get("/:userId/bookings", getAllUserBookings);
router.get("/:userId", getUserById);
router.put("/:userId/password", updatePassword);
router.delete("/:userId", deleteUser);
router.get("/admin/statistics", getStatistics); // statistic (admin)

module.exports = router;
