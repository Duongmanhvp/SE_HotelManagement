class RoomDto {
  constructor(place) {
    const { _id, name, price, address, images, review_scores } = place;
    this._id = _id;
    this.name = name;
    this.price = price;
    this.address = address;
    this.images = images;
    this.review_scores = review_scores;
  }
}
module.exports = RoomDto;
