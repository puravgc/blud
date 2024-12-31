import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI ?? "";
    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }
    await mongoose.connect(uri);
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
