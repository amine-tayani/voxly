import express, { Request, Response } from "express";
import Question from "../models/Question";
import QuestionService from "../services/questions";

const router = express.Router();

export const askQuestion = async (req: Request, res: Response) => {
  try {
    const { title, content, location } = req.body;
    const userId = req.body.id;

    const newQuestion = new Question({
      title,
      content,
      author: userId,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
    });

    const savedQuestion = await newQuestion.save();

    res.json({ savedQuestion });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Error while posting a question" });
  }
};

export const getNearbyQuestions = async (req: Request, res: Response) => {
  const latitude = req.query.latitude;
  const longitude = req.query.latitude;

  try {
    // @ts-ignore
    const questions = await QuestionService.getNearBy(longitude, latitude);

    return res.status(201).json({
      questions,
    });
  } catch (error) {
    return res.status(400).json({ message: "error while fetching questions" });
  }
};

export const likeQuestion = async (req: Request, res: Response) => {};

export default router;
