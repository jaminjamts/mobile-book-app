import express from "express";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import "dotenv/config";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "email has a already used" });
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username has a already used" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      profileImages: "",
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new Error("nuuts ug altaatai baina");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    throw new Error("error");
  }
});

export default router;
