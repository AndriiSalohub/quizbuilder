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

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await quizService.getQuiz(id);
    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(404).json({ error: "Quiz not found" });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("aaaaaa");
    const result = await quizService.deleteQuiz(id);
    res.json(result);
  } catch (error) {
    console.error("Error deleting quiz:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({ error: "Quiz not found" });
    } else {
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  }
};
