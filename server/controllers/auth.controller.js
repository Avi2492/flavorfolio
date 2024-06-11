import prisma from "../db/prisma.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password,
      },
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(200).json({ message: `Invalid Data` });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error in Signup Controller" });
  }
};
