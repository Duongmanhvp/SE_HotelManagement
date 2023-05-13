const User = require("../models/User");
const userSchema = require("../validate/user.validate");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = userSchema.validate(user);
    if (result.error) {
      return res.status(400).send("Not valid request data! Try again.");
    }
    await User.create({ ...user, role: "CUSTOMER" });
    return res.json(user);
  } catch (error) {
    return res.status(500).send("Server error! Try again.");
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
    return res.status(500).send("Server error! Try again.");
  }
};

module.exports = { register, login };
