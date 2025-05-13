import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGODB_URI;

if (!mongo_url) {
  throw new Error("Please set the MONGODB_URI environment variable");
}

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log("MongoDB connection error...");
    console.log(err);
  });
