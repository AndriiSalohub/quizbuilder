import { Quiz } from "../../models/quiz.model";
import { Question } from "../../models/question.model";
import { QuestionType } from "../../models/questionType.model";
import { Option } from "../../models/option.model";

export const getAllQuizzes = async () => {
  const quizzes = await Quiz.findAll({
    include: [
      {
        model: Question,
        include: [{ model: Option }, { model: QuestionType }],
      },
    ],
  });

  return quizzes;
};

export const getQuiz = async (id: string) => {
  const quiz = await Quiz.findByPk(id, {
    include: [
      {
        model: Question,
        include: [{ model: Option }, { model: QuestionType }],
      },
    ],
  });

  if (!quiz) {
    throw new Error(`Quiz with id ${id} not found`);
  }

  return quiz;
};

interface CreateQuizInput {
  title: string;
  questions: {
    text: string;
    typeId: string;
    options?: { text: string; isCorrect: boolean }[];
    correctAnswer?: string;
  }[];
}

export const createQuiz = async (data: CreateQuizInput) => {
  const { title, questions } = data;

  try {
    const quiz = await Quiz.create({
      title,
    });

    for (const q of questions) {
      const questionType = await QuestionType.findOne({
        where: { id: q.typeId },
      });

      if (!questionType) {
        throw new Error(`Invalid question type: ${q.typeId}`);
      }

      const question = await Question.create({
        quizId: quiz.id,
        typeId: questionType.id,
        text: q.text,
      });

      if (parseInt(q.typeId) === 3 && q.correctAnswer !== undefined) {
        await Option.create({
          questionId: question.id,
          text: q.correctAnswer,
          isCorrect: true,
        });
      } else if (q.options?.length) {
        for (const opt of q.options) {
          await Option.create({
            questionId: question.id,
            text: opt.text,
            isCorrect: opt.isCorrect,
          });
        }
      }
    }

    return quiz;
  } catch (error) {
    throw error;
  }
};
