import { Router } from "express";
import { getAllQuizzes } from "../controllers/quiz.controller";

const router = Router();

router.get("/quizzes", getAllQuizzes);

export default router;
