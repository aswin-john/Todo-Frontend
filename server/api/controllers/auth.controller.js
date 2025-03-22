import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username) {
    return res.status(400).json({ message: "Username is missing" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is missing" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is missing" });
  }
  try {
    // Check if user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists." });
    }

    // Hash the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate required fields

  if (!email) {
    return res.status(400).json({ message: "Email is missing" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is missing" });
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentilas!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET,  { expiresIn: "30d" });
    const { password: pass, ...rest } = validUser._doc;
      // Send only token in the response
      res.status(200).json({ rest ,accesToken:token });
    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user signout succesfully");
  } catch (error) {
    next(error);
  }
};
