// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import "dotenv/config";
// import chatRoutes from "./routes/chat.js";

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api", chatRoutes);

// // Database Connection + Start Server
// const startServer = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log("✅ Connected with Database!");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("❌ Failed to connect with DB:", error.message);
//     process.exit(1); // stop app if DB fails
//   }
// };
// startServer();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 5001;

console.log(
  "🔎 Loaded MONGODB_URI:",
  process.env.MONGODB_URI ? "Exists" : "Undefined"
);

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const startServer = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // force IPv4, matches driver recommendation
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
