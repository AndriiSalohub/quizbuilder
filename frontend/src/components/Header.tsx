import { NotebookPen } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-4 w-full p-4 shadow-sm">
      <h1 className="flex items-center justify-center gap-2 text-4xl font-bold text-slate-800">
        <NotebookPen className="h-8 w-8" />
        Quiz Builder
      </h1>
    </header>
  );
};

export default Header;
