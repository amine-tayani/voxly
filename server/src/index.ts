import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config";

const PORT = 5000;

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

app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose.connect(url).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
