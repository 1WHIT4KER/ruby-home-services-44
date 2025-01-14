import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { ExitConfirmationDialog } from "./ExitConfirmationDialog";
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

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteFormDialog = ({ open, onOpenChange }: QuoteFormDialogProps) => {
  const { step, setStep, formData, setFormData, resetForm } = useQuoteForm();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    resetForm();
    setShowExitDialog(false);
    onOpenChange(false);
  };

  // Calculate progress percentage
  const totalSteps = 10; // Total number of steps including welcome and thank you
  const progressPercentage = (step / (totalSteps - 1)) * 100;

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
          <div className="space-y-6">
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-ruby-red" />
              <p className="text-sm text-muted-foreground text-center">
                Step {step + 1} of {totalSteps}
              </p>
            </div>
            {steps[step]}
          </div>
        </DialogContent>
      </Dialog>

      <ExitConfirmationDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirm={confirmExit}
      />
    </>
  );
};