import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgress = ({ currentStep, totalSteps }: FormProgressProps) => {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="space-y-2">
      <Progress 
        value={progressPercentage} 
        className="h-2 sm:h-3 bg-gray-100" 
        indicatorClassName="bg-ruby-red" 
      />
      <p className="text-xs sm:text-sm text-muted-foreground text-center">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
};