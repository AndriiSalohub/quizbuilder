import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-quiz")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/create-quiz"!</div>;
}
