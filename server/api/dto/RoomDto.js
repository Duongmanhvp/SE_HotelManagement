class RoomDto {
  constructor(room) {
    const {
      _id,
      name,
      description,
      property_type,
      room_type,
      bed_type,
      minimum_nights,
      maximum_nights,
      bedrooms,
      guests_included,
      host,
    } = room;
    this._id = room.id;
    this.name = room.name;
    this.description = room.description;
    this.property_type = room.property_type;
    this.room_type = room.room_type;
    this.bed_type = room.bed_type;
    //   this.minimum_nights=;
    //   this.maximum_nights=;
    //   this.bedrooms=;
    //   this.guests_included=;
    //   this.host=;
    //   this.address=;
    //   this.photos=;
    //   this.amenities=;
    //   this.review_scores=;
    //   this.reviews;
  }
}
