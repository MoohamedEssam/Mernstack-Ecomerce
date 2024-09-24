import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected TO Data Base ${connect.connection.host}`);
  } catch (error) {
    console.log(`ERROR in MONGODB ${error}`);
  }
};

export default connectDB;
