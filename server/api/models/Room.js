const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  property_type: String,
  room_type: String,
  bed_type: String,
  minimum_nights: Number,
  maximum_nights: Number,
  bedrooms: Number,
  beds: Number,
  guests_included: Number,
  bathrooms: Number,
  host: {
    host_name: String,
    host_about: String,
  },
  address: {
    street: String,
    market: String,
    country: String,
  },
  booked: [{ check_in: Date, check_out: Date }],
  price: Number,
  images: Object,
  amenities: [String],
  security_deposit: Number,
  cleaning_fee: Number,
  review_scores: Object,
  reviews: Array,
});

const RoomModel = mongoose.model("Room", RoomSchema);

module.exports = RoomModel;
