import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const QuizCreationCard = () => {
  return (
    <section className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-gray-100 p-3">
          <Upload className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Your Quiz</h2>
      </div>

      <p className="mb-6 max-w-md text-center leading-relaxed text-gray-600">
        Build engaging quizzes in minutes with Quiz Builder.
      </p>

      <Button
        className="group relative cursor-pointer px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
        size="lg"
      >
        <Link to="/create">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            Create quiz
          </div>
        </Link>
      </Button>
    </section>
  );
};

export default QuizCreationCard;
