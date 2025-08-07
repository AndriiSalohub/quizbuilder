import { useQuizStore } from "@/store/quizStore";
import { useEffect } from "react";
import QuizListItem from "./QuizListItem";

const QuizList = () => {
  const { quizzes, fetchQuizzes } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <section className="min-h-screen p-6">
      <h2 className="mb-6 text-3xl font-bold">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-400">No quizzes available.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map(quiz => (
            <li key={quiz.id}>
              <QuizListItem quiz={quiz} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default QuizList;
