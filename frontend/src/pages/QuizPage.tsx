import { useEffect } from "react";
import type { Question } from "@/types/quizTypes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuizStore } from "@/store/quizStore";

const QuizPage = ({ quizId }: { quizId: string }) => {
  const { quiz, fetchQuiz } = useQuizStore();

  useEffect(() => {
    fetchQuiz(quizId);
  }, [quizId, fetchQuiz]);

  if (!quiz) return <div className="text-center text-gray-500">Loading...</div>;

  const getTypeColor = (type: number) => {
    switch (type) {
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-purple-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCorrectAnswer = (question: Question) => {
    const isShortAnswer =
      question.typeId === 3 ||
      question.questionType.name.toLowerCase().includes("short answer");

    if (isShortAnswer && question.options.length > 0) {
      const correctOption = question.options.find(option => option.isCorrect);
      return correctOption ? correctOption.text : "Not specified";
    }
    return null;
  };

  const renderQuestionContent = (question: Question) => {
    const isShortAnswer =
      question.typeId === 3 ||
      question.questionType.name.toLowerCase().includes("short answer");

    if (isShortAnswer) {
      const correctAnswer = getCorrectAnswer(question);
      return (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
          <p className="mb-1 text-sm font-medium text-green-800">
            Correct Answer:
          </p>
          <p className="text-green-700">
            {correctAnswer || "No answer specified"}
          </p>
        </div>
      );
    } else if (question.options.length > 0) {
      return (
        <ul className="mt-4 space-y-2">
          {question.options.map((option, optIndex) => (
            <li
              key={optIndex}
              className={`flex items-center rounded-md p-2 ${
                option.isCorrect
                  ? "border border-green-200 bg-green-50"
                  : "border border-gray-200 bg-gray-50"
              }`}
            >
              <span
                className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  option.isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {String.fromCharCode(65 + optIndex)}
              </span>
              <span
                className={
                  option.isCorrect
                    ? "font-medium text-green-700"
                    : "text-gray-600"
                }
              >
                {option.text}
              </span>
              {option.isCorrect && (
                <Badge className="ml-auto bg-green-500 text-white">
                  Correct
                </Badge>
              )}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p className="mt-4 text-gray-500 italic">No options available</p>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {quiz.title}
          </CardTitle>
          <p className="mt-2 text-gray-600">
            {quiz.questions.length} question
            {quiz.questions.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {quiz.questions.map((question: Question, index: number) => (
          <Card
            key={question.id}
            className="shadow-md transition-shadow hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="mr-4 flex-1 text-xl font-semibold text-gray-700">
                  <span className="mr-2 text-gray-500">Q{index + 1}.</span>
                  {question.text}
                </h2>
                <Badge
                  className={`text-white ${getTypeColor(question.typeId)} shrink-0`}
                >
                  {question.questionType.name || "Unknown"}
                </Badge>
              </div>

              {renderQuestionContent(question)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
