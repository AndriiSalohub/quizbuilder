import { create } from "zustand";
import type { Quiz } from "@/types/quizTypes";
import axios from "axios";

interface QuizzesStore {
  quizzes: Quiz[];
  fetchQuizzes: () => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
}

export const API_URL = import.meta.env.VITE_API_URL;

export const useQuizzesStore = create<QuizzesStore>(set => ({
  quizzes: [],
  fetchQuizzes: async () => {
    const allQuizzes = await axios.get(`${API_URL}/quizzes`);
    set({ quizzes: allQuizzes.data });
  },
  deleteQuiz: async (id: string) => {
    console.log(id);
    await axios.delete(`${API_URL}/quizzes/${id}`);
    set(state => ({
      quizzes: state.quizzes.filter(q => q.id !== +id),
    }));
  },
}));
