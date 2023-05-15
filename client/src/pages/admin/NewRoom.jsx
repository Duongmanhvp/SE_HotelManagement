import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRoom } from "../../api";
import roomSchema from "../../validate/RoomValidator";

function NewRoom() {
  const services = [
    "TV",
    "Cable TV",
    "Wifi",
    "Kitchen",
    "Paid parking off premises",
    "Smoking allowed",
    "Pets allowed",
    "Buzzer/wireless intercom",
    "Heating",
    "Family/kid friendly",
    "Washer",
    "First aid kit",
    "Fire extinguisher",
    "Essentials",
    "Hangers",
    "Hair dryer",
    "Iron",
    "Pack ’n Play/travel crib",
    "Room-darkening shades",
    "Hot water",
    "Bed linens",
    "Extra pillows and blankets",
    "Microwave",
    "Coffee maker",
    "Refrigerator",
    "Dishwasher",
    "Dishes and silverware",
    "Cooking basics",
    "Oven",
    "Stove",
    "Cleaning before checkout",
    "Waterfront",
    "Others",
  ];
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    amenities: [],
  });
  const [error, setError] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const result = roomSchema.validate(room);
      if (!result.error) {
        setError(null);
        createRoom(room);
        alert("Add new room success");
        navigate("/admin/rooms");
      } else {
        window.scrollTo(0, 0);
        setError(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setError(null);
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className=" py-12 w-2/3 flex flex-col gap-4 items-center justify-start">
          <button className="mb-4 text-xl font-medium hover:bg-primary duration-200 w-full bg-primary/80 text-white py-2 text-center rounded-3xl">
            <Link to="/admin/rooms" className="block w-full">
              Back
            </Link>
          </button>
          <div className="w-full text-center">
            <h2 className="text-3xl font-bold">Add New Room </h2>
            <span className="text-sm font-semibold">
              Fields marked with <span className="red">(*)</span> is required!
            </span>
            {error && (
              <div className="bg-red-400/40 text-center py-2 rounded-3xl">
                <p className="text-red-800 font-semibold">{`Error: ${error}`}</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label>
                  Room name <span className="red">(*)</span>
                </label>
                <input
                  placeholder="Ex: Ocean View Waikiki Marina w/prkg"
                  type="text"
                  name="name"
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <label>
                  Room description <span className="red">(*)</span>
                </label>
                <textarea
                  placeholder="Ex: Room description..."
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label>
                  Choose room images <span className="red">(*)</span>
                </label>
                <input
                  className="ml-12"
                  type="file"
                  name="roomImage"
                  multiple
                  onChange={(e) =>
                    setRoom({
                      ...room,
                      [e.target.name]: e.target.files[0],
                    })
                  }
                ></input>
              </div>
              <div className="price flex flex-col gap-2">
                <div>
                  <label for="price">
                    Core Price <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="security_deposit">
                    Security deposit <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="security_deposit"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="cleaning_fee">
                    Cleaning fee <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="cleaning_fee"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-12 justify-between items-center">
                  <label for="property_type" className="grow">
                    Property Type <span className="red">(*)</span>
                  </label>
                  <select
                    name="property_type"
                    onChange={handleChange}
                    className="border-2 px-2 py-1 grow rounded-lg"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Serviced apartment">
                      Serviced apartment
                    </option>
                    <option value="Villa">Villa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex gap-12 justify-between items-center">
                  <label for="room_type" className="grow">
                    Room Type <span className="red">(*)</span>
                  </label>
                  <select
                    name="room_type"
                    onChange={handleChange}
                    className="border-2 px-2 py-1 grow rounded-lg"
                  >
                    <option value="Entire home/apt">Entire home/apt</option>
                    <option value="Private room">Private room</option>
                    <option value="Shared room">Shared room</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex gap-12 justify-between items-center">
                  <label for="bed_type" className="grow">
                    Bed Type <span className="red">(*)</span>
                  </label>
                  <select
                    className="border-2 px-2 py-1 grow rounded-lg"
                    name="bed_type"
                    onChange={handleChange}
                  >
                    <option value="Real Bed">Real Bed</option>
                    <option value="Futon">Futon</option>
                    <option value="Pull-out Sofa">Pull-out Sofa</option>
                    <option value="Couch">Couch</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label>
                  Amenities <span className="red">(*)</span>
                </label>
                <ul className="grid grid-cols-4 gap-x-6 gap-y-3">
                  {services.map((item) => (
                    <li
                      key={item}
                      className="flex justify-start items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={item}
                        onChange={(e) => {
                          console.log(room);
                          if (e.target.checked) {
                            setRoom({
                              ...room,
                              amenities: [...room.amenities, item],
                            });
                          } else {
                            const newAmenities = room.amenities.filter(
                              (i) => i !== item
                            );
                            setRoom({ ...room, amenities: newAmenities });
                          }
                        }}
                      ></input>
                      <label for="">{item}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <label for="minimum_nights">Minimum Nights</label>
                  <input
                    type="number"
                    name="minimum_nights"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="maximum_nights">Maximum Nights</label>
                  <input
                    type="number"
                    name="maximum_nights"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                <div>
                  <label for="bedrooms">
                    Bedrooms <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="beds">
                    Beds <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="beds"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="bathrooms">
                    Bathrooms <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="guests_included">
                    Guests Included <span className="red">(*)</span>
                  </label>
                  <input
                    type="number"
                    name="guests_included"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div>
                  <label for="host_name">
                    Host name <span className="red">(*)</span>
                  </label>
                  <input
                    name="host_name"
                    type="text"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label for="host_about">Host about</label>
                  <textarea
                    name="host_about"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="address">
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <label for="country">
                      Country <span className="red">(*)</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <label for="market">
                      City (Market) <span className="red">(*)</span>
                    </label>
                    <input
                      name="market"
                      type="text"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label for="street">
                    Street <span className="red">(*)</span>
                  </label>
                  <textarea name="street" onChange={handleChange}></textarea>
                </div>
              </div>
              <button
                className="text-xl font-medium hover:bg-primary duration-200 w-full bg-primary/80 text-white py-2 text-center rounded-3xl"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewRoom;
