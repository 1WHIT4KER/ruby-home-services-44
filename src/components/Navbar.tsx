import { Button } from "./ui/button";

interface NavbarProps {
  onQuoteClick?: () => void;
}

export const Navbar = ({ onQuoteClick }: NavbarProps) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent py-4">
      <div className="container mx-auto relative">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/77ce0bf0-17d7-43e2-b81f-3a314b8484c0.png" 
            alt="Ruby - All Things Home-y"
            className="h-20"
          />
        </div>
        <div className="absolute right-4 top-4">
          <Button 
            className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8"
            onClick={() => window.location.href = "tel:+13853523406"}
          >
            CALL US
          </Button>
        </div>
      </div>
    </nav>
  );
};