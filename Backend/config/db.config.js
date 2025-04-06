import mongooes from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("Database URI Not setted well");
    }
    await mongooes.connect(process.env.MONGODB_URI);
    console.log("DB connected Successfully");
  } catch (error) {
    throw new Error("Failed connecting to DB", error.message);
  }
};
