// import prisma from "../db/prisma.js";

import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: "Internal Server error in getuserprofile controller!",
    });
  }
};

// export const updateUserProfile = async (req, res) => {
//   const {} = req.body;
// };
