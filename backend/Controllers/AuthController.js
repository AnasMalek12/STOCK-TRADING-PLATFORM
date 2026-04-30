const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// Standardized cookie options for reuse
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true, // Prevents XSS attacks
  secure: isProduction, // Requires HTTPS in production
  sameSite: isProduction ? "none" : "strict", // "none" allows cross-origin cookies in prod
  maxAge: 24 * 60 * 60 * 1000, // 1 day (match JWT expiry)
};

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      email,
      password, // Use hashedPassword here if not using a Mongoose hook
      username,
    });

    // 2. Generate token and set cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, cookieOptions);

    // 3. Remove password from the response object
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // 3. Verify password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // 4. Generate token and set cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, cookieOptions);

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.Logout = async (req, res) => {
  try {
    // Note: clearCookie requires the exact same options (domain, path, secure, etc.)
    // used to set the cookie, except for maxAge/expires.
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
