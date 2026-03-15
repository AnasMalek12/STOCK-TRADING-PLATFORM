const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET
    const user = await User.findById(data.id);

    if (user) return res.json({ status: true, user: user.username });
    else return res.json({ status: false });
  } catch (err) {
    console.error(err);
    return res.json({ status: false });
  }
};

module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};