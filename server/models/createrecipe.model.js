import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
      // required: true,
      default: "",
    },
    servings: {
      type: Number,
      required: true,
    },
    kitchenName: {
      type: String,
      required: true,
    },
    vegOrNon: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
