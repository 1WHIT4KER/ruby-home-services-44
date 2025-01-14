import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage = ({ onNext }: WelcomePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="w-48">
        <Image 
          src="/lovable-uploads/77ce0bf0-17d7-43e2-b81f-3a314b8484c0.png"
          alt="Logo"
          className="w-full h-auto"
        />
      </div>
      <p className="text-lg text-center text-muted-foreground max-w-md">
        Welcome! Let's get you set up with a quick and easy quote for our professional window cleaning services.
      </p>
      <Button onClick={onNext} size="lg" className="mt-4">
        Start
      </Button>
    </div>
  );
};

export default WelcomePage;