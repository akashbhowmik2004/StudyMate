import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
//Create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
// Handle Signup
export const signup = async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  try {
    if (!email || !password || !username || !name) {
      return res.status(400).json({
        success: false,
        message: "fill up all fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        field: "confirmPassword",
        message: "Password didn't match",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        field: "username",
        message: "User already existed",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        field: "password",
        message: "Password must ne 6 character long",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    const { password: userPassword, ...otherDetails } = newUser._doc;
    res.status(201).json({
      success: true,
      message: "Signup successfully",
      token,
      otherDetails,
    });
  } catch (err) {
    console.log(err);
    if (err.errorResponse.code === 11000) {
      return res.status(400).json({
        success: false,
        field: "username",
        message: "Username already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Handle Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }
    const token = createToken(user._id, user.username);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    //Spread all the details except password
    const { password: userPassword, ...otherDetails } = user._doc;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      otherDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const verifyUsers = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("username email");
    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
