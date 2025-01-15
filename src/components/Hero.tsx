import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

interface HeroProps {
  onQuoteClick?: () => void;
}

export const Hero = ({ onQuoteClick }: HeroProps) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <img
        src="/lovable-uploads/75031317-fc89-4b78-9134-1524b39a269d.png"
        alt="Window cleaner at work on a ladder"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto pt-32 md:pt-40 px-4 flex flex-col items-center text-center">
        <h1 className="text-white font-rubik font-bold text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4">
          DIRTY WINDOWS?
        </h1>
        <h2 className="text-ruby-red font-rubik text-3xl md:text-4xl lg:text-5xl mb-8">
          WE LOVE THOSE.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <Button 
            className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8 py-6 text-lg w-full md:w-auto"
            onClick={onQuoteClick}
          >
            QUICK START
          </Button>
          <span className="text-white font-medium text-xl hidden md:block">OR</span>
          <Button 
            className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8 py-6 text-lg w-full md:w-auto"
            onClick={() => setContactOpen(true)}
          >
            REACH OUT
          </Button>
        </div>
      </div>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-rubik mb-4">Get in Touch</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-ruby-red" />
              <a href="tel:385-352-3406" className="text-lg hover:text-ruby-red">
                385-352-3406
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-ruby-red" />
              <a href="mailto:rubyyhome@gmail.com" className="text-lg hover:text-ruby-red">
                rubyyhome@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Instagram className="h-5 w-5 text-ruby-red" />
              <a 
                href="https://instagram.com/rubyy.home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg hover:text-ruby-red"
              >
                @rubyy.home
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Facebook className="h-5 w-5 text-ruby-red" />
              <a 
                href="https://facebook.com/rubyy.home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg hover:text-ruby-red"
              >
                @rubyy.home
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};