import express, { Router } from "express";
import {
  askQuestion,
  getNearbyQuestions,
  likeQuestion,
} from "../controllers/question";

const router: Router = express.Router();

router.post("/post", askQuestion);
router.post("/:questionId/like", likeQuestion);
router.get("/nearby", getNearbyQuestions);

export default router;
