const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Room = require("./api/models/Room");
const User = require("./api/models/User");
const cors = require("cors");
const bodyParser = require("body-parser");
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");
const Booking = require("./api/models/Booking");
const { startOfMonth, startOfWeek, endOfWeek } = require("date-fns");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/rooms", async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    let data = await Room.find({}).limit(100);
    data = data.map((item) => new Room(item));
    return res.json(data);
  }
  const { country, city, checkin, checkout, guests, rooms } = req.query;
  const diffday = differenceInCalendarDays(
    new Date(checkout).getTime(),
    new Date(checkin).getTime()
  );

  const dbQuery = {
    $text: { $search: country },
  };

  const data = await Room.find(dbQuery).limit(100);
  const filter = data.filter((room) => {
    const minNight = +room.minimum_nights <= diffday;
    const maxNight = +room.maximum_nights >= diffday;
    const checkguest = +room.guests_included >= guests;

    const checkRoom = +room.bedrooms >= rooms;

    return minNight && maxNight && checkRoom && checkguest;
  });
  res.json(filter.map((item) => new Room(item)));
});
app.get("/api/rooms/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Room.findOne({ _id: id });
  res.json(new Room(data));
});
app.post("/api/auth/register", async (req, res) => {
  const user = req.body;
  await User.create({ ...user, role: "CUSTOMER" });
  res.json(user);
});
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).send("Invalid email or password! Pls try again.");
  }
  return res.status(200).json(user);
});
app.get("/api/users", async (req, res) => {
  const users = await User.find({ role: "CUSTOMER" });
  return res.status(200).json(users);
});
app.get("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).send("User not found!");
  }
  return res.status(200).json(user);
});
app.post("/api/payments", async (req, res) => {
  const payment = { ...req.body, _id: Date.now(), feedbacked: false };
  try {
    await Booking.create(payment);
    res.json({ _id: payment._id });
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/payments", async (req, res) => {
  const bookings = await Booking.find({});
  res.status(200).json(bookings);
});
app.get("/api/payments/:paymentId", async (req, res) => {
  const paymentId = req.params.paymentId;
  const payment = await Booking.findOne({ _id: paymentId });
  if (!payment) {
    return res.status(404).send("Payemnt not found!");
  }
  return res.status(200).json(payment);
});
app.get("/api/:userId/payments", async (req, res) => {
  const userId = req.params.userId;
  const payments = await Booking.find({ userId: userId });

  return res.status(200).json(payments);
});

app.post("/api/reviews/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { userName, stars, feedback } = req.body;

    const booking = await Booking.findOne({ _id: bookingId });
    const { placeId, userId } = {
      placeId: booking.place._id,
      userId: booking.userId,
    };

    const old_place = await Room.findOne({ _id: placeId });
    let old_star_rate = old_place.review_scores;
    if (Object.keys(old_star_rate).length === 0) {
      old_star_rate = {
        review_scores_accuracy: 0,
        review_scores_cleanliness: 0,
        review_scores_checkin: 0,
        review_scores_communication: 0,
        review_scores_location: 0,
        review_scores_value: 0,
        review_scores_rating: 0,
      };
    }
    const star_rate = old_star_rate.review_scores_rating;
    let new_star_rate = {};
    for (const field in old_star_rate) {
      if (field !== "review_scores_rating") {
        const element = old_star_rate[field];
        new_star_rate = {
          ...new_star_rate,
          [field]: Math.round(
            (element * star_rate + stars[field]) / (star_rate + 1)
          ),
        };
      } else {
        new_star_rate = { ...new_star_rate, [field]: star_rate + 1 };
      }
    }

    await Room.updateOne(
      { _id: placeId },
      {
        $set: {
          review_scores: new_star_rate,
        },
        $push: {
          reviews: {
            date: new Date(),
            listing_id: placeId,
            reviewer_id: userId,
            reviewer_name: userName,
            comments: feedback,
          },
        },
      }
    );
    await Booking.updateOne(
      { _id: bookingId },
      {
        $set: {
          feedbacked: true,
        },
      }
    );
    res.status(200).send("Feedback successfully!");
  } catch (error) {
    console.log(error);
  }
});

// statistic (admin)
app.get("/api/admin/statistics", async (req, res) => {
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
    $and: [{ createdAt: { $gte: startMonth } }, { createdAt: { $lte: curr } }],
  });
  const currMonthRevenue = currentMonthBookings.reduce(
    (total, currBooking) => total + currBooking.price.totalPrice,
    0
  );
  //const roomsNumber = await Room.find({});
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
});

app.listen(process.env.PORT_SERVER, () => {
  console.log("server started");
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("db connected"));
});
