import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfoSection } from "../components/Summary/PersonalInfoSection";
import { ServicesSection } from "../components/Summary/ServicesSection";
import { DiscountsSection } from "../components/Summary/DiscountsSection";
import { AppointmentSection } from "../components/Summary/AppointmentSection";
import { PaymentMethodSection } from "../components/Summary/PaymentMethodSection";
import { useState } from "react";

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
    paymentMethod: string;
  };
  onNext: () => void;
  onPrevious: () => void;
}

const SummaryPage = ({ formData, onNext, onPrevious }: SummaryPageProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log("Starting form submission...");

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
        wants_review_discount: formData.wantsReviewDiscount,
        payment_method: formData.paymentMethod
      });

      console.log("Form submission response:", error || "Success");

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <PersonalInfoSection {...formData} />
            <ServicesSection {...formData} />
            <DiscountsSection wantsReviewDiscount={formData.wantsReviewDiscount} />
            <AppointmentSection appointmentDate={formData.appointmentDate} />
            <PaymentMethodSection paymentMethod={formData.paymentMethod} />
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-center text-muted-foreground">
        We'll collect payment after we've completed the service
      </p>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default SummaryPage;