import QuizCreationCard from "@/components/QuizCreationCard";
import QuizList from "@/components/QuizList";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-7xl">
      <QuizCreationCard />
      <QuizList />
    </main>
  );
};

export default HomePage;
