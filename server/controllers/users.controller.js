import userModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "./../utilities/token.js";

export const login = async (req, res) => {
  try {
    // get data from client
    const { email, password } = req.body;
    // check data
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field is required" });
    }
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });
    }
    // check user password
    const checkPassword = await bcrypt.compare(password, user?.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }
    // generate token
    const userOne = await userModel.findOne({ email }).select("-password");
    const token = generateToken(userOne);
    if (!token) {
      return res
        .status(500)
        .json({ success: false, message: "Token generation failed" });
    }
    const options = {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true, // Prevents access to cookies via client-side scripts
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      sameSite: "strict", // Prevents CSRF attacks
    };
    // send response
    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login successful",
      name: user.name,
      token
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const signup = async (req, res) => {
  try {
    // get data from client
    const { name, email, password } = req.body;
    // check data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field is required" });
    }
    // check if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hash user password
    const saltRounds = process.env.SALT ? parseInt(process.env.SALT) : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create user
    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // const userInfo = await userModel.findById(newUser._id).select("-password");
    // send response
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    // get jwt token
    const { id } = req.user;

    const userCheck = await userModel.findById(id);
    if (!userCheck) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not authorized" });
    }
    const options = {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Prevents CSRF attacks
    };

    // clear cookies
    return res
      .status(200)
      .cookie("token", "", options)
      .json({ success: true, message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
