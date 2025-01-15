import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { ExitConfirmationDialog } from "./ExitConfirmationDialog";
import { FormProgress } from "./components/FormProgress";
import { FormSteps } from "./components/FormSteps";

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

  const totalSteps = 10;

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => {
        if (!open) {
          handleExit();
        } else {
          onOpenChange(open);
        }
      }}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] sm:w-full h-[90vh] sm:h-[80vh] overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col h-full">
            <FormSteps 
              step={step}
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              onClose={() => onOpenChange(false)}
            />
            <div className="mt-auto pt-4 sm:pt-6">
              <FormProgress currentStep={step} totalSteps={totalSteps} />
            </div>
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