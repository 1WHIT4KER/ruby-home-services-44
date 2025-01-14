import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface SummaryPageProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    homeType: "single" | "multi" | "";
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
        address: `${formData.streetAddress}${formData.unit ? `, ${formData.unit}` : ''}, ${formData.city}, ${formData.state}`,
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
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">Review Your Information</h2>
      </div>

      <Card className="bg-white shadow-md max-h-[60vh] overflow-y-auto">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg font-medium">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Personal Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="block text-muted-foreground">Name</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Phone</span>
                  <span>{formData.phone}</span>
                </div>
                {formData.email && (
                  <div className="col-span-2">
                    <span className="block text-muted-foreground">Email</span>
                    <span>{formData.email}</span>
                  </div>
                )}
                <div className="col-span-2">
                  <span className="block text-muted-foreground">Address</span>
                  <span>{formData.streetAddress}{formData.unit ? `, ${formData.unit}` : ''}, {formData.city}, {formData.state}</span>
                </div>
                {formData.homeType && (
                  <div className="col-span-2">
                    <span className="block text-muted-foreground">Home Type</span>
                    <span>{formData.homeType === 'single' ? 'Single Story' : 'Multi Story'}</span>
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Selected Services</h3>
              <div className="space-y-1 text-sm">
                {formData.screenCleaning && <p>• Screen Cleaning ($4 per screen)</p>}
                {formData.exteriorPowerWashing && <p>• Exterior Power Washing ($150)</p>}
                {formData.gutterCleaning && <p>• Gutter Cleaning ($100-$200)</p>}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Discounts</h3>
              <div className="space-y-1 text-sm">
                {formData.wantsReviewDiscount && (
                  <p>• Review Discount: $20 off your service for writing a review</p>
                )}
                {/* Space for future discounts */}
              </div>
            </section>

            {formData.appointmentDate && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Appointment</h3>
                <p className="text-sm">{format(formData.appointmentDate, "MMMM d, yyyy 'at' h:mm a")}</p>
              </section>
            )}
          </div>
        </CardContent>
      </Card>

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