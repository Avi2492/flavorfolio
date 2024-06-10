import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { id, name, username, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        username,
        email,
      },
    });
    res.status(200).json({ message: `Signup Success "${newUser}"` });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error in Signup Controller" });
  }
};
