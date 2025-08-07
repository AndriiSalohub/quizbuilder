import { create } from "zustand";
import type { Quiz } from "@/types/quizTypes";
import axios from "axios";

interface QuizStore {
  quizzes: Quiz[];
  fetchQuizzes: () => Promise<void>;
}

export const useQuizStore = create<QuizStore>(set => ({
  quizzes: [],
  fetchQuizzes: async () => {
    const allQuizzes = await axios.get("http://localhost:3008/quizzes");
    set({ quizzes: allQuizzes.data });
  },
}));
