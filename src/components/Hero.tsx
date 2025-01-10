import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src="/lovable-uploads/5afad52f-983c-41af-876a-73ca650585f9.png"
        alt="Window cleaner at work"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto pt-40 px-4">
        <h1 className="text-white font-rubik font-bold text-7xl md:text-8xl mb-4">
          DIRTY WINDOWS?
        </h1>
        <h2 className="text-ruby-red font-rubik text-4xl md:text-5xl mb-8">
          WE LOVE THOSE.
        </h2>
        <Button 
          className="bg-ruby-red hover:bg-ruby-red/90 text-white rounded-full px-8 py-6 text-lg"
          onClick={() => {
            // Add quote form logic here
            console.log("Get a quote clicked");
          }}
        >
          GET A QUOTE
        </Button>
      </div>
    </div>
  );
};