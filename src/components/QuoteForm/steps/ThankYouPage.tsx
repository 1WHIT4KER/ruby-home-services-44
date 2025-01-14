import { format } from "date-fns";
import { ActionButtons } from "../components/ThankYou/ActionButtons";

interface ThankYouPageProps {
  formData: {
    appointmentDate: Date | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    selectedContract: string;
    screenCleaning: boolean;
    exteriorPowerWashing: boolean;
    gutterCleaning: boolean;
  };
  onClose: () => void;
}

const ThankYouPage = ({ formData, onClose }: ThankYouPageProps) => {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-ruby-red">Thanks!</h2>
      
      {formData.appointmentDate && (
        <div className="space-y-2">
          <p className="text-lg">
            Expect our technician on {format(formData.appointmentDate, "PPpp")}
          </p>
          <p className="text-gray-600">
            We'll reach out to confirm your servicing two days and two hours ahead of time
          </p>
        </div>
      )}

      <ActionButtons formData={formData} onClose={onClose} />
    </div>
  );
};

export default ThankYouPage;