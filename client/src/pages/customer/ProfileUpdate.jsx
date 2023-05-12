import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

function ProfileUpdate() {
  const [user] = useContext(UserContext);
  const [newUser, setNewUser] = useState(user);
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form>
      <div>
        <label className="font-semibold text-lg">Tên pháp lý</label>
        <input
          name="name"
          type="text"
          className="text-gray-500"
          value={newUser.name}
          onChange={handleChange}
        ></input>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Địa chỉ email</label>
        <input
          name="email"
          type="email"
          value={newUser.email}
          onChange={handleChange}
          className="text-gray-500"
        ></input>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Password</label>
        <p className="text-gray-500">
          {user.password
            .split("")
            .map((c) => "*")
            .join("")}
        </p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Ngày sinh</label>
        <input name="birthday" type="date" onChange={handleChange}></input>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Giới tính</label>
        <div className="flex justify-start gap-12 items-center">
          <div className="">
            <input
              id="male"
              type="radio"
              name="gender"
              value="Male"
              onClick={handleChange}
            ></input>
            <label for="male">Male</label>
          </div>
          <div className="">
            <input
              id="female"
              type="radio"
              name="gender"
              value="Female"
              onClick={handleChange}
            ></input>
            <label for="female">Female</label>
          </div>
        </div>
      </div>
      <hr className="mt-5 mb-5"></hr>

      <div>
        <label className="font-semibold text-lg">Số điện thoại</label>
        <input
          type="text"
          value={newUser.phone}
          name="phone"
          onChange={handleChange}
        ></input>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Địa chỉ</label>
        <textarea
          name="address"
          value={newUser.address}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ProfileUpdate;
