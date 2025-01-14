import { Button } from "@/components/ui/button";

interface ThankYouPageProps {
  formData: {
    appointmentDate: Date | null;
  };
  onClose: () => void;
}

const ThankYouPage = ({ formData, onClose }: ThankYouPageProps) => {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-ruby-red">Thanks!</h2>
      {formData.appointmentDate && (
        <p className="text-lg">
          Expect our technician on {formData.appointmentDate.toLocaleString()}
        </p>
      )}
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default ThankYouPage;