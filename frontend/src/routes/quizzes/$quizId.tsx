import QuizPage from "@/pages/QuizPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/quizzes/$quizId")({
  component: RouteComponent,
  loader: ({ params }) => {
    const quizId = params["quizId"];
    return { quizId };
  },
});

function RouteComponent() {
  const { quizId } = useLoaderData({
    from: "/quizzes/$quizId",
  });

  return <QuizPage quizId={quizId} />;
}
