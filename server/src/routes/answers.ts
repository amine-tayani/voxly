import express, { Router } from "express";
import { GiveAnswer } from "../controllers/answer";
import authMiddleware from "../middlewares/auth";

const router: Router = express.Router();

router.post("/post/:questionId", authMiddleware, GiveAnswer);

export default router;
