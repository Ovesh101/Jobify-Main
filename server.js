import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());

import cloudinary from "cloudinary";

// Middleware
import { authenticateUser } from "./middleware/authMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
// Public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// router
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import roleRouter from "./routes/roleRouter.js"
import userInfoRouter from "./routes/userInfoRouter.js";

// Cloudinary For Storing images
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ msg: "Testing The Route using proxy" });
});


app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/info", authenticateUser, userInfoRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/roles", authenticateUser , roleRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Not Found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
// Error middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  // connection to  mongo db
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
