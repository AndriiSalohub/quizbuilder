import type { Request, Response } from "express";
import * as quizService from "../services/quiz.sevice";

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};
