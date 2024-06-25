import * as dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "FlavourFolio API is Running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: localhost:${PORT}`);
  connectMongoDB();
});
