import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/prueba");
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};
