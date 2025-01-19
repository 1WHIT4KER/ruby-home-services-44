import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar = ({ onQuoteClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex justify-start">
            <Link to="/admin" className="text-ruby-red hover:text-ruby-red/80">
              Admin
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-ruby-red">
              Ruby
            </Link>
          </div>
          
          <div className="flex-1 flex justify-end">
            <Button 
              variant="ghost" 
              onClick={onQuoteClick}
              className="text-ruby-red hover:text-ruby-red/80 hover:bg-ruby-red/10"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};