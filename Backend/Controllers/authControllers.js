import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phone,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error in Signing up user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User does not exists", success: false });
    }
    const confirmPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
    const token = await jwt.sign({ id: existingUser._id }, "secreyKey@503110", {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error in Signing up user", success: false });
  }
};
