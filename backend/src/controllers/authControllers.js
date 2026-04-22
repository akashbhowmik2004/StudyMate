import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  //Handel duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Log incoming data for debugging
  console.log("Signup request received:", { name, email, password });

  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    console.log(token);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Signup error:", error.message);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const Login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Log incoming data for debugging
  console.log("Login request received:", { email, password });

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      console.log("User not found");
    }
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
      console.log("Invalid credentials");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Signup error:", error.message);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.status(200).json({ message: "Logged out successfully" });
};
