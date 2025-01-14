import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SummaryPageProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    wantsInstantQuote: boolean;
    selectedContract: string;
    screenCleaning: boolean;
    exteriorPowerWashing: boolean;
    gutterCleaning: boolean;
    appointmentDate: Date | null;
    wantsReviewDiscount: boolean;
  };
  onNext: () => void;
  onPrevious: () => void;
}

const SummaryPage = ({ formData, onNext, onPrevious }: SummaryPageProps) => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('form_submissions').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        wants_instant_quote: formData.wantsInstantQuote,
        selected_contract: formData.selectedContract,
        screen_cleaning: formData.screenCleaning,
        exterior_power_washing: formData.exteriorPowerWashing,
        gutter_cleaning: formData.gutterCleaning,
        appointment_date: formData.appointmentDate?.toISOString(),
        wants_review_discount: formData.wantsReviewDiscount
      });

      if (error) throw error;

      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Review Your Information</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Personal Information</h3>
          <p>Name: {formData.firstName} {formData.lastName}</p>
          <p>Phone: {formData.phone}</p>
          {formData.email && <p>Email: {formData.email}</p>}
          <p>Address: {formData.address}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Selected Services</h3>
          {formData.screenCleaning && <p>• Screen Cleaning ($4 per screen)</p>}
          {formData.exteriorPowerWashing && <p>• Exterior Power Washing ($150)</p>}
          {formData.gutterCleaning && <p>• Gutter Cleaning ($100-$200)</p>}
        </div>

        {formData.appointmentDate && (
          <div className="space-y-2">
            <h3 className="font-medium">Appointment</h3>
            <p>{formData.appointmentDate.toLocaleString()}</p>
          </div>
        )}

        {formData.wantsReviewDiscount && (
          <p className="text-sm text-muted-foreground">
            You'll receive a $20 discount for writing a review after the service.
          </p>
        )}
      </div>

      <p className="text-sm text-center text-muted-foreground">
        We'll collect payment after we've completed the service
      </p>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default SummaryPage;