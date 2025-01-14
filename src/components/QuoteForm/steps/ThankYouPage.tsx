import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download, Share } from "lucide-react";

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
  const downloadAsPDF = () => {
    // Create text content for the file
    const content = `
Service Reservation Details:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.streetAddress}${formData.unit ? `, ${formData.unit}` : ''}
${formData.city}, ${formData.state}
Appointment: ${formData.appointmentDate ? format(formData.appointmentDate, "PPpp") : 'TBD'}

Selected Services:
- Contract Type: ${formData.selectedContract}
${formData.screenCleaning ? '- Screen Cleaning' : ''}
${formData.exteriorPowerWashing ? '- Exterior Power Washing' : ''}
${formData.gutterCleaning ? '- Gutter Cleaning' : ''}
    `;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'service-reservation.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const shareReservation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Window Cleaning Service Reservation',
          text: `My window cleaning service is scheduled for ${formData.appointmentDate ? format(formData.appointmentDate, "PPpp") : 'TBD'}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-ruby-red">Thanks!</h2>
      
      {formData.appointmentDate && (
        <div className="space-y-2">
          <p className="text-lg">
            Expect our technician on {format(formData.appointmentDate, "PPpp")}
          </p>
          <p className="text-gray-600">
            We'll reach out to remind you of your service two days and two hours beforehand
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={downloadAsPDF}
        >
          <Download className="mr-2" />
          Download Reservation
        </Button>
        
        {navigator.share && (
          <Button 
            variant="outline"
            className="w-full"
            onClick={shareReservation}
          >
            <Share className="mr-2" />
            Share Reservation
          </Button>
        )}

        <Button 
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;