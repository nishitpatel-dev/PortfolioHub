import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

const dbConn = async () => {
  const connection = await mongoose.connect(url);

  if (connection) {
    console.log("Database Connected Successfully");
  }
};

export default dbConn;
