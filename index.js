import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./route/book.route.js"; // Ensure the correct import path and file extension
import userRoute from "./route/user.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDb;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Define the routes
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/book", router);
app.use("/user", userRoute);

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

startServer();
