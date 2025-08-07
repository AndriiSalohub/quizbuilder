import { create } from "zustand";
import type { Quiz } from "@/types/quizTypes";
import axios from "axios";
import { API_URL } from "./quizzesStore";

interface QuizStore {
  quiz: Quiz | null;
  fetchQuiz: (id: string) => Promise<void>;
}

export const useQuizStore = create<QuizStore>(set => ({
  quiz: null,
  fetchQuiz: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/quizzes/${id}`);
      set({ quiz: response.data });
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    }
  },
}));
