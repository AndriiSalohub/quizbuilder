import CreateQuizPage from "@/pages/CreateQuizPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateQuizPage />;
}
