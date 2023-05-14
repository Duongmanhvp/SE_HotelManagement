import React, { useContext, useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import UserContext from "../../context/UserContext";
import { IoMdAddCircle } from "react-icons/io";
import { addService, removeService } from "../../api";
import { AiFillMinusCircle } from "react-icons/ai";

function Services({ items, placeId }) {
  const [showServices, setShowServices] = useState(false);
  const [newService, setNewService] = useState("");
  const [services, setServices] = useState(items);
  const [user] = useContext(UserContext);
  const [adding, setAdding] = useState(false);
  const admin = !!user && user.role === "ADMIN";
  const longService = services.length > 10;
  const handleAdd = async () => {
    try {
      await addService(newService, placeId);
      setServices([...services, newService]);
      setAdding(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (item) => {
    try {
      await removeService(item, placeId);
      setServices(services.filter((i) => i !== item));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-3  mb-8">
        <h2 className="font-bold text-2xl">Nơi này có những gì cho bạn</h2>
        {admin && !adding && (
          <span onClick={() => setAdding(true)}>
            <IoMdAddCircle
              size={30}
              className="cursor-pointer text-green-600"
            ></IoMdAddCircle>
          </span>
        )}
        {admin && adding && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              required
              onChange={(e) => setNewService(e.target.value)}
            ></input>
            <buttom
              type="submit"
              className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg"
              onClick={handleAdd}
            >
              Add
            </buttom>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-2">
        {!longService &&
          services.map((item) => (
            <ServiceItem
              item={item}
              handleRemove={() => handleRemove(item)}
            ></ServiceItem>
          ))}
        {longService && !showServices && (
          <>
            {services.slice(0, 10).map((item) => (
              <ServiceItem
                item={item}
                handleRemove={() => handleRemove(item)}
              ></ServiceItem>
            ))}
            <div className="col-span-2">
              <button
                className="toggle-btn w-1/3"
                onClick={() => {
                  setShowServices(true);
                }}
              >
                Show all
              </button>
            </div>
          </>
        )}
        {longService && showServices && (
          <>
            {services.map((item) => (
              <ServiceItem
                item={item}
                handleRemove={() => handleRemove(item)}
              ></ServiceItem>
            ))}
            <div className="col-span-2">
              <button
                className="toggle-btn w-1/3"
                onClick={() => {
                  setShowServices(false);
                }}
              >
                Hide
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
const ServiceItem = ({ item, handleRemove }) => {
  const [hover, setHover] = useState(false);
  const [user] = useContext(UserContext);
  const admin = !!user && user.role === "ADMIN";
  return (
    <li
      className="flex items-center mb-6"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(!admin || (admin && !hover)) && (
        <BsCheckCircleFill
          size={24}
          style={{ color: "green" }}
        ></BsCheckCircleFill>
      )}
      {admin && hover && (
        <AiFillMinusCircle
          size={24}
          className="cursor-pointer"
          style={{ color: "red" }}
          onClick={handleRemove}
        ></AiFillMinusCircle>
      )}
      <span className="ml-3">{item}</span>
    </li>
  );
};

export default Services;
