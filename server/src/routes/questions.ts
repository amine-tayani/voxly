import express, { Router } from "express";
import {
  askQuestion,
  getNearbyQuestions,
  likeQuestion,
} from "../controllers/question";
import authMiddleware from "../middlewares/auth";

const router: Router = express.Router();

router.post("/post", authMiddleware, askQuestion);
router.post("/:questionId/like", authMiddleware, likeQuestion);
router.get("/nearby", authMiddleware, getNearbyQuestions);

export default router;
