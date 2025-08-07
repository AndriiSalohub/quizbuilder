import { Router } from "express";
import { createQuiz, getAllQuizzes, getQuiz } from "../controllers/quiz.controller";

const router = Router();

router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuiz);
router.post("/quizzes", createQuiz);

export default router;
