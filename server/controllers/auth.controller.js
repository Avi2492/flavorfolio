import prisma from "../db/prisma.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
// import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+\@[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    }

    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).json({ error: "Username is already taken!" });
    // }

    // const existingEmail = await User.findOne({ email });
    // if (existingEmail) {
    //   return res
    //     .status(400)
    //     .json({ error: "User Email is already taken! Login maybe" });
    // }

    // if (password.length < 6) {
    //   return res
    //     .status(400)
    //     .json({ error: "Password must be atleast 6 characters long" });
    // }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser.id, res);

      // await newUser.save();

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        // profileImg: newUser.profileImg,
        // coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ message: `Invalid User Data` });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error in Signup Controller" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      // password: user.password,
      // profileImg: user.profileImg,
      // coverImg: user.coverImg,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error in Login Controller" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error in Logout Controller" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error in GetMe Controller" });
  }
};
