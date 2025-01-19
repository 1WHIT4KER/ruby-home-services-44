import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {
  onQuoteClick?: () => void;
}

export const Navbar = ({ onQuoteClick }: NavbarProps) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent py-4">
      <div className="container mx-auto relative">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img 
              src="/lovable-uploads/77ce0bf0-17d7-43e2-b81f-3a314b8484c0.png" 
              alt="Ruby - All Things Home-y"
              className="h-20"
            />
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={onQuoteClick}>
              Get a Quote
            </Button>
            <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};