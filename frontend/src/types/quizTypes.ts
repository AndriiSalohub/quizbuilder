export interface QuizOption {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  quizId: number;
  typeId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  options: QuizOption[];
  questionType: QuestionType;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}
