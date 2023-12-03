import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import config from "./config/config";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import questionRoutes from "./routes/questions";
import answerRoutes from "./routes/answers";

const PORT = config.port || 5000;

const app = express();

const {
  mongoose: { url },
} = config;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

mongoose
  .connect(url)
  .then(() => console.log("database connected successfully "))
  .catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
