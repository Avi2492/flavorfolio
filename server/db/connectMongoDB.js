import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${response}`);
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};

export default connectMongoDB;
