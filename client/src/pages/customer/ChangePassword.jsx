import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { changePassword } from "../../api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword !== user.password) {
      setError("Wrong old password!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 24) {
      setError("Password must be length between 8 and 24!");
      return;
    }
    changePassword(user._id, newPassword)
      .then((res) => {
        setUser({ ...user, password: newPassword });
        navigate("/account");
      })
      .catch((err) => {
        setError("Something wrong! Try again.");
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 py-10 px-[5%]">
        <div className="bg-gray-100 p-10">
          {error && (
            <div className="bg-red-400/40 text-center py-2 rounded-3xl mb-6">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}
          <h1 className="text-2xl font-bold mb-5">Change Password</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="oldPassword" className="block font-bold mb-2">
                Old Password
              </label>

              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setError("");
                }}
                className="border border-gray-400 p-2 w-full"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="newPassword" className="block font-bold mb-2">
                New Password
              </label>

              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                className="border border-gray-400 p-2 w-full"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block font-bold mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="border border-gray-400 p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
