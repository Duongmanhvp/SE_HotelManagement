const Room = require("../models/Room");
const RoomDto = require("../dto/RoomDto");
const Booking = require("../models/Booking");
const roomSchema = require("../validate/room.validate");

const getAllRooms = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      let data = await Room.find({}).limit(100);
      data = data.map((item) => new RoomDto(item));
      return res.json(data);
    }
    const { country, city, checkin, checkout, guests } = req.query;
    const address = ((country || "") + " " + (city || "")).trim();

    const queryArr = [];
    if (address) {
      queryArr.push({ $text: { $search: address } });
    }
    queryArr.push({ guests_included: { $gte: guests || 1 } });
    const dbQuery = {
      $and: queryArr,
    };
    if (!checkin && !checkout) {
      let data = await Room.find(dbQuery).limit(100);
      data = data.map((item) => new RoomDto(item));
      return res.json(data);
    }
    if (!checkin) {
      checkin = checkout;
    }
    if (!checkout) {
      checkout = checkin;
    }
    const data = await Room.find(dbQuery).limit(100);
    const checkinTime = new Date(checkin).getTime();
    const checkoutTime = new Date(checkout).getTime();
    const filter = data.filter((room) => {
      const overlayCheckin = room.booked.some((book) => {
        return (
          book.check_in.getTime() <= checkinTime &&
          checkinTime <= book.check_out.getTime()
        );
      });
      const overlayCheckout = room.booked.some((book) => {
        return (
          book.check_in.getTime() <= checkoutTime &&
          checkoutTime <= book.check_out.getTime()
        );
      });
      return !overlayCheckin && !overlayCheckout;
    });

    res.json(filter.map((item) => new RoomDto(item)));
  } catch (error) {
    res.status(500).send("Something Wrong! Try again.");
  }
};

const createRoom = async (req, res) => {
  const room = req.body;
  const { amenities, host_name, host_about, country, market, street } = room;
  delete room.host_name;
  delete room.host_about;
  delete room.country;
  delete room.market;
  delete room.street;
  const now = Date.now();
  try {
    const newRoom = new Room({
      ...room,
      _id: now,
      amenities: amenities.split(","),
      host: {
        host_name,
        host_about,
      },
      address: {
        country,
        market,
        street,
      },
    });
    // const result = roomSchema.validate(newRoom);
    // if (result.error) {
    //   return res.status(400).send("Not valid request data! Try again.");
    // }
    await newRoom.save();
    return res.status(200).send({ _id: newRoom._id });
  } catch (error) {
    return res.status(500).send("Server error! Try again.");
  }
};

const getRoomById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Room.findOne({ _id: id });
    if (!data) {
      return res.status(404).send("Room not found!");
    }
    res.json(new Room(data));
  } catch (error) {
    return res.status(500).send("Server error! Try again.");
  }
};

// const updateRoom = async (req, res) => {
//   const { placeId } = req.params;
//   const update = req.body;
//   try {
//     let room = await Room.findOne({ _id: placeId });
//     for (const key in update) {
//       const value = update[key];
//       room[key] = value;
//     }

//     await room.save();
//     return res.status(200).send("Update room success.");
//   } catch (error) {
//     res.status(500).send("Server error! Try again.");
//   }
// };
const addService = async (req, res) => {
  const { placeId } = req.params;
  const item = req.body.item;
  try {
    const room = await Room.findOne({ _id: placeId });
    room.amenities.push(item);
    await room.save();
    return res.status(200).send("Add service success.");
  } catch (error) {
    return res.status(500).send("Server error! try again.");
  }
};
const updatePrice = async (req, res) => {
  const { placeId } = req.params;
  const newPrice = req.body.newPrice;
  try {
    const room = await Room.findOne({ _id: placeId });
    room.price = newPrice;
    await room.save();
    return res.status(200).send("Update price success.");
  } catch (error) {
    return res.status(500).send("Server error! try again.");
  }
};
const removeService = async (req, res) => {
  const { placeId } = req.params;
  const item = req.body.item;
  try {
    const room = await Room.findOne({ _id: placeId });
    console.log(item);
    room.amenities = room.amenities.filter((i) => i !== item);
    await room.save();
    return res.status(200).send("Remove service success.");
  } catch (error) {
    return res.status(500).send("Server error! try again.");
  }
};

const deleteRoom = async (req, res) => {
  const placeId = req.params.placeId;
  try {
    await Room.deleteOne({ _id: placeId });
    res.status(200).send("Delete room successfully!");
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const createReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { userName, stars, feedback } = req.body;

    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      return res.status(404).send("Booking not found!");
    }
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
    res.status(500).send("Server failed! Try again.");
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  getRoomById,
  createReview,
  deleteRoom,
  addService,
  removeService,
  updatePrice,
};
