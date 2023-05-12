import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-5">Change Password</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="oldPassword" className="block font-bold mb-2">
            Old Password:
          </label>

          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="newPassword" className="block font-bold mb-2">
            New Password:
          </label>

          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block font-bold mb-2">
            Confirm Password:
          </label>

          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>

        {error && <div className="text-red-500 mb-5">{error}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
