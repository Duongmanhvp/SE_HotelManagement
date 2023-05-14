class RoomDto {
  constructor(place) {
    const { _id, name, price, address, images, review_scores } = place;
    this._id = _id;
    this.name = name;
    this.price = price;
    this.address = address;
    this.images = images;
    this.review_scores = review_scores;
    this.availability = this.checkRenting(place);
  }
  checkRenting(place) {
    const now = Date.now();
    return place.booked.some(({ check_in, check_out }) => {
      const checkin = new Date(check_in).getTime();
      const checkout = new Date(check_out).getTime();
      return checkin <= now && checkout >= now;
    });
  }
}
module.exports = RoomDto;
