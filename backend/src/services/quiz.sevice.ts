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

  console.log(quizzes);

  return quizzes;
};
