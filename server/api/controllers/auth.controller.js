const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = req.body;
    await User.create({ ...user, role: "CUSTOMER" });
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send("Invalid email or password! Pls try again.");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error! Try again.");
  }
};

module.exports = { register, login };
