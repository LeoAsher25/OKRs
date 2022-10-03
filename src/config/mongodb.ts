import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connect DB successfully!");
  } catch (err) {
    console.log("Connect DB error: ", err);
  }
};
export default connectDB;
