import QuizCreationCard from "@/components/QuizCreationCard";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-7xl">
      <QuizCreationCard />
      <Link to="/quizzes" className="flex justify-center">
        <Button className="mt-4 cursor-pointer p-6 text-xl">
          See all quizzes
        </Button>
      </Link>
    </main>
  );
};

export default HomePage;
