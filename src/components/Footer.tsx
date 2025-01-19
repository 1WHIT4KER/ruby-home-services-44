import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="fixed bottom-4 right-4">
      <Link 
        to="/admin" 
        className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
      >
        Admin
        <ArrowRight className="h-3 w-3" />
      </Link>
    </footer>
  );
};