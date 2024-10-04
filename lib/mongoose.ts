import mongoose from "mongoose";

let isConnected = false; // Track connection status

export default async function connectToDb() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing URL for MongoDB...");
  }
  if (isConnected) {
    console.log("Already connected to MongoDB...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
  }
}
