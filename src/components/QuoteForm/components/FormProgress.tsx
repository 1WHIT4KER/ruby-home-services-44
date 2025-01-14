import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgress = ({ currentStep, totalSteps }: FormProgressProps) => {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-ruby-red" />
  );
};