import { Button } from "@/components/ui/button";

interface SchedulingPageProps {
  formData: {
    appointmentDate: Date | null;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SchedulingPage = ({ formData, setFormData, onNext, onPrevious }: SchedulingPageProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">When can we stop by?</h2>
        <p className="text-muted-foreground">
          Say goodbye to stressful scheduling...use this scheduler to pick the open time slot that works best for you!
        </p>
      </div>

      <div className="flex-1 min-h-[300px]">
        {/* Calendar component - to be implemented later */}
      </div>

      <p className="text-sm text-center">
        Please Note: While we value punctuality, some jobs may take longer than anticipated. Expect technicians to arrive on time or within 90 minutes of your scheduled time. Weather or emergencies may also require us to reschedule, but we'll notify you promptly. Thank you for your understanding!
      </p>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default SchedulingPage;