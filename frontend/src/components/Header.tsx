import { Link } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-4 w-full p-4 shadow-sm">
      <nav>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-4xl font-bold text-slate-800"
        >
          <NotebookPen className="h-8 w-8" />
          Quiz Builder
        </Link>
      </nav>
    </header>
  );
};

export default Header;
