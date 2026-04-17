import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectToMongodb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
