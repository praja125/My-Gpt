import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database connected")
    );
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quickgpt",
    });
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
  }
};

export default connectDB;
