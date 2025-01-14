import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import WelcomePage from "./steps/WelcomePage";
import PersonalInfoPage from "./steps/PersonalInfoPage";
import AddressPage from "./steps/AddressPage";
import QuoteCalculatorPage from "./steps/QuoteCalculatorPage";
import ContractSelectionPage from "./steps/ContractSelectionPage";
import AdditionalServicesPage from "./steps/AdditionalServicesPage";
import SchedulingPage from "./steps/SchedulingPage";
import ReviewOfferPage from "./steps/ReviewOfferPage";
import SummaryPage from "./steps/SummaryPage";
import ThankYouPage from "./steps/ThankYouPage";
import { useToast } from "@/hooks/use-toast";

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteFormDialog = ({ open, onOpenChange }: QuoteFormDialogProps) => {
  const [step, setStep] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    wantsInstantQuote: true,
    selectedContract: "",
    screenCleaning: false,
    exteriorPowerWashing: false,
    gutterCleaning: false,
    appointmentDate: null as Date | null,
    wantsReviewDiscount: false
  });

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      wantsInstantQuote: true,
      selectedContract: "",
      screenCleaning: false,
      exteriorPowerWashing: false,
      gutterCleaning: false,
      appointmentDate: null,
      wantsReviewDiscount: false
    });
    setStep(0);
    setShowExitDialog(false);
    onOpenChange(false);
  };

  const steps = [
    <WelcomePage onNext={() => setStep(1)} />,
    <PersonalInfoPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(2)}
      onPrevious={() => setStep(0)}
    />,
    <AddressPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(3)}
      onPrevious={() => setStep(1)}
    />,
    <QuoteCalculatorPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(4)}
      onPrevious={() => setStep(2)}
    />,
    <ContractSelectionPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(5)}
      onPrevious={() => setStep(3)}
    />,
    <AdditionalServicesPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(6)}
      onPrevious={() => setStep(4)}
    />,
    <SchedulingPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(7)}
      onPrevious={() => setStep(5)}
    />,
    <ReviewOfferPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(8)}
      onPrevious={() => setStep(6)}
    />,
    <SummaryPage 
      formData={formData}
      onNext={() => setStep(9)}
      onPrevious={() => setStep(7)}
    />,
    <ThankYouPage 
      formData={formData}
      onClose={() => {
        setStep(0);
        onOpenChange(false);
      }}
    />
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => {
        if (!open) {
          handleExit();
        } else {
          onOpenChange(open);
        }
      }}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] overflow-y-auto">
          {steps[step]}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to exit?</AlertDialogTitle>
            <AlertDialogDescription>
              All your progress will be lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExitDialog(false)}>Continue</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};