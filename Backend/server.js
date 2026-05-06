import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("✅ Connected with Database!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect with DB:");
    console.error(error);
    process.exit(1);
  }
};

startServer();