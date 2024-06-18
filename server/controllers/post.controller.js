import { prisma } from "../db/prisma.js";

export const createPost = async (req, res) => {
  try {
    const { id, image, link, servings, kitchenName, vegOrNonVeg, healthy } =
      req.body;

    const userId = await prisma.user.id.toString();
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: "Internal Server error in create post controller" });
  }
};
