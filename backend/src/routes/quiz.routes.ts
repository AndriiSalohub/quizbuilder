import { Router } from "express";
import { createQuiz, getAllQuizzes } from "../controllers/quiz.controller";

const router = Router();

router.get("/quizzes", getAllQuizzes);
router.post("/quizzes", createQuiz);

export default router;
