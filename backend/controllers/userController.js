import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rspHandler } from "../utils/utils.js";
//创建TOKEN JWT
const createToken = (userId) =>{
  return jwt.sign({ id: userId }, process.env.JWT_SECRET,{ expiresIn: "7d"});
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      rspHandler(res, null, 400, "User already exists");
      return;
    }
    if(password.length < 6){
      rspHandler(res, null, 400, "Password must be at least 6 characters long");
      return;
    }

    const salt =  await bcrypt.genSalt(); //生成盐
    const hashedPassword = await bcrypt.hash(password, salt); //哈希密码

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    rspHandler(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    }, 201, "User registered successfully");

  } catch (error) {
    console.error("Error registering user:", error);
    rspHandler(res, null, 500, "Internal server error");
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      rspHandler(res, null, 500, "Invalid email or password");
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      rspHandler(res, null, 400, "Invalid credentials");
      return;
    }

    rspHandler(res, { 
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    }, 200, "User logged in successfully");

  } catch (error) {
    console.error("Error logging in user:", error);
    rspHandler(res, null, 500, "Internal server error");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      rspHandler(res, null, 404, "User not found");
      return;
    }

    rspHandler(res, user, 200, "User profile retrieved successfully");
  } catch (error) {
    console.error("Error retrieving user profile:", error);
  }
}