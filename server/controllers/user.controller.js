import prisma from "../db/prisma.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        fullName: true,
        password: false,
        email: true,
        createdAt: true,
      },
    });

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
