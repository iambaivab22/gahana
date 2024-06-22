const User = require("../modals/userModal");

const express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: password });
    await user.save();

    res.status(201).json({
      data: user,
      userRoles: userRole,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid email or password." });
    // }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    let userRoles = "";

    if (email === "meromail123@gmail.com" && password === "123456783") {
      console.log("admin");
      userRoles = "ADMIN";
    } else {
      userRoles = "USER";
      console.log("non admin");
    }

    console.log("userRoles", userRoles, "role");

    res.json({ token, user: user, userRoles: userRoles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed." });
  }
};
