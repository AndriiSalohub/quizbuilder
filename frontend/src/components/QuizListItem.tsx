import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Quiz } from "@/types/quizTypes";
import { Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  quiz: Quiz;
};

const QuizListItem = ({ quiz }: Props) => {
  const questionCount = quiz.questions.length;
  const uniqueTypes = Array.from(
    new Set(quiz.questions.map(q => q.questionType.name))
  );

  return (
    <Card className="border-gray-700 bg-gray-900 text-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{quiz.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {questionCount} {questionCount === 1 ? "question" : "questions"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-gray-300">
        <div>
          <span className="text-gray-400">Question Types:</span>{" "}
          {uniqueTypes.length > 0 ? uniqueTypes.join(", ") : "N/A"}
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Link to="/quizzes/$quizId" params={{ quizId: quiz.id.toString() }}>
          <Button className="cursor-pointer bg-white text-black transition-all duration-300 hover:bg-gray-200">
            View Details
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto cursor-pointer text-red-500 transition-all duration-200 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Quiz Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this quiz? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer gap-2">
                Delete
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer gap-2">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default QuizListItem;
