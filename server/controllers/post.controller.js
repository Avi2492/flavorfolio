import Recipe from "../models/createrecipe.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { servings, kitchenName, vegOrNon, badge } = req.body;
    let { link, img } = req.body;

    const userId = req.user._id.toString();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newRecipe = new Recipe({
      user: userId,
      servings,
      kitchenName,
      vegOrNon,
      badge,
      link,
      img,
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe Created Success!" + newRecipe });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: "Internal Server error in create post controller" });
  }
};
