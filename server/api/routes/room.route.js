const express = require("express");
const {
  getAllRooms,
  getRoomById,
  createReview,
  createRoom,
} = require("../controllers/room.controller");
const { uploadsFileToDrive } = require("../services/ggdrive");

const router = express.Router();
const multer = require("multer");

require("dotenv").config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.post("/", upload.single("roomImage"), uploadsFileToDrive, createRoom);
router.post("/reviews/:bookingId", createReview);

module.exports = router;
