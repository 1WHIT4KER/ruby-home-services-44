import { Button } from "./ui/button";

interface HeroProps {
  onQuoteClick?: () => void;
}

export const Hero = ({ onQuoteClick }: HeroProps) => {
  return (
    <div className="relative min-h-screen">
      <img
        src="/lovable-uploads/5afad52f-983c-41af-876a-73ca650585f9.png"
        alt="Window cleaner at work"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto pt-40 px-4 flex flex-col items-center text-center">
        <h1 className="text-white font-rubik font-bold text-7xl md:text-8xl mb-4">
          DIRTY WINDOWS?
        </h1>
        <h2 className="text-ruby-red font-rubik text-4xl md:text-5xl mb-8">
          WE LOVE THOSE.
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <Button 
            className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8 py-6 text-lg"
            onClick={onQuoteClick}
          >
            QUICK START
          </Button>
          <span className="text-white font-medium">OR</span>
          <Button 
            className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8 py-6 text-lg"
            onClick={onQuoteClick}
          >
            REACH OUT
          </Button>
        </div>
      </div>
    </div>
  );
};