import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import useRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import TaskRouter from "./routes/Task.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();



mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("server is running in 3000!!!");
});


app.use("/api/auth", authRouter);
app.use("/api", TaskRouter);
// app.use("/api", useRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "intenal eror";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
