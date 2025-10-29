import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  //if database is connected do not connect again
  if (isConnected) {
    console.log("Database is  connected");
    return;
  }

  //connect to Mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
export default connectDB;
