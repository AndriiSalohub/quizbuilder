import { Router } from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuiz } from "../controllers/quiz.controller";

const router = Router();

router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuiz);
router.post("/quizzes", createQuiz);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
