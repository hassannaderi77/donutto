import mongoose from "mongoose";

export default async function connectDB() {
  console.log(">>> connecting… current state:", mongoose.connection.readyState);

  try {
    if (mongoose.connection.readyState === 1) {
      console.log(">>> Already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log(">>> Connected successfully");
  } catch (err) {
    console.log(">>> DB Error:", err);
  }
}
