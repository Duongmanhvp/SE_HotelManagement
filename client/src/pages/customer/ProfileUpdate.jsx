import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api";
import { format } from "date-fns";

function ProfileUpdate() {
  const [user, setUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(user);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(newUser)
      .then((res) => {
        setUser(res.data);
        navigate("/account");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 py-10 px-[5%]">
        {error && (
          <div className="bg-red-400/40 text-center py-2 rounded-3xl mb-6">
            <p className="text-red-800 font-semibold">{`Update user failed! Try again.`}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center mb-4">
            Update profile
          </h2>
          <div>
            <label className="font-semibold text-lg">Tên pháp lý</label>
            <input
              name="name"
              type="text"
              className="text-gray-700"
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
              className="text-gray-700"
            ></input>
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <label className="font-semibold text-lg">Password</label>
            <p className="text-gray-700">
              {user.password
                .split("")
                .map((c) => "*")
                .join("")}
            </p>
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <label className="font-semibold text-lg">Ngày sinh</label>
              <input
                name="birthday"
                type="date"
                value={format(new Date(newUser.birthday), "yyyy-MM-dd")}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label className="font-semibold text-lg">Số điện thoại</label>
              <input
                type="text"
                value={newUser.phone}
                name="phone"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div className="grid grid-cols-3 gap-16">
            <label className="font-semibold text-lg">Giới tính</label>

            <div className="">
              <input
                id="male"
                type="radio"
                name="gender"
                value="Male"
                checked={newUser.gender === "Male"}
                onClick={handleChange}
              ></input>
              <label for="male" className="ml-1">
                Male
              </label>
            </div>
            <div className="">
              <input
                id="female"
                type="radio"
                name="gender"
                value="Female"
                checked={newUser.gender === "Female"}
                onClick={handleChange}
              ></input>
              <label for="female" className="ml-1">
                Female
              </label>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full mt-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
