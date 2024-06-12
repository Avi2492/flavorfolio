import prisma from "../db/prisma.js";

import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        password: false,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server error in protectRoute" });
  }
};
