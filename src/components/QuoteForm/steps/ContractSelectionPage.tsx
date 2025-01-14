import { Button } from "@/components/ui/button";

interface ContractSelectionPageProps {
  formData: {
    selectedContract: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ContractSelectionPage = ({ formData, setFormData, onNext, onPrevious }: ContractSelectionPageProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">Choose Your Service Plan</h2>
        <p className="text-muted-foreground">
          Select the perfect maintenance plan that suits your needs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Contract buttons - to be implemented later */}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default ContractSelectionPage;