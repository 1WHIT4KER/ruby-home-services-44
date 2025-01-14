import { Button } from "@/components/ui/button";

interface ReviewOfferPageProps {
  formData: {
    wantsReviewDiscount: boolean;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ReviewOfferPage = ({ formData, setFormData, onNext, onPrevious }: ReviewOfferPageProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Want to help us out with a review?</h2>
        <p className="text-muted-foreground">
          We'll knock off $20 if you write us a review after our service (we'll send you a link once we've finished up at your place)...interested?
        </p>
      </div>

      <div className="space-y-4 flex flex-col items-center">
        <Button
          size="lg"
          onClick={() => {
            setFormData({ ...formData, wantsReviewDiscount: true });
            onNext();
          }}
        >
          Yes! I'm in.
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setFormData({ ...formData, wantsReviewDiscount: false });
            onNext();
          }}
        >
          No thanks, not this time
        </Button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      </div>
    </div>
  );
};

export default ReviewOfferPage;