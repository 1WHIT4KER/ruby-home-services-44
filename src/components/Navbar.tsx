import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-ruby-red font-rubik text-3xl font-bold">
          Ruby
          <div className="text-sm text-black font-nunito">ALL THINGS HOME-Y</div>
        </div>
        <Button 
          className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8"
          onClick={() => window.location.href = "tel:+1234567890"}
        >
          CALL US
        </Button>
      </div>
    </nav>
  );
};