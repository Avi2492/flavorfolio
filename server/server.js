import express from "express";
import connectMongoDB from "./db/connectMongoDB.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({ message: "FlavourFolio is in Development mode!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: localhost:${PORT}`);
  connectMongoDB();
});
