import AddQuizForm from "@/components/AddQuizForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddQuizForm />;
}
