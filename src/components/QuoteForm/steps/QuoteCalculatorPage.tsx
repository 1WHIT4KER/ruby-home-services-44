import { Button } from "@/components/ui/button";

interface QuoteCalculatorPageProps {
  formData: {
    wantsInstantQuote: boolean;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuoteCalculatorPage = ({ formData, setFormData, onNext, onPrevious }: QuoteCalculatorPageProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">Instant Quote Calculator</h2>
        <p className="text-muted-foreground">
          Something that sets us apart from other Home Service companies...find out how much our service will cost you right away! Professional service at unbeatable prices...and all without taxes or hidden fees!
        </p>
      </div>

      <div className="flex-1 min-h-[200px]">
        {/* Calculator space - to be implemented later */}
      </div>

      <Button
        variant="link"
        className="w-full text-sm"
        onClick={() => {
          setFormData({ ...formData, wantsInstantQuote: false });
          onNext();
        }}
      >
        Would you rather have us quote you when we come to service your home? Click here.
      </Button>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default QuoteCalculatorPage;