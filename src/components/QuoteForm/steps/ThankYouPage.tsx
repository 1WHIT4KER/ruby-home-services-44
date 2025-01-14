import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

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
  const getReservationText = () => {
    return `
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
  };

  const downloadAsPDF = () => {
    const blob = new Blob([getReservationText()], { type: 'text/plain' });
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
    const text = getReservationText();
    
    try {
      // Try Web Share API first
      if (navigator.share) {
        await navigator.share({
          title: 'Window Cleaning Service Reservation',
          text: text,
        });
        return;
      }

      // Fallback to clipboard if Web Share API is not available
      await navigator.clipboard.writeText(text);
      toast.success("Reservation details copied to clipboard!");
    } catch (error) {
      console.log('Error sharing:', error);
      // Final fallback - try clipboard again
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Reservation details copied to clipboard!");
      } catch (clipboardError) {
        toast.error("Couldn't share the reservation. Please try downloading instead.");
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
            We'll reach out to confirm your servicing two days and two hours ahead of time
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
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={shareReservation}
        >
          <Share2 className="mr-2" />
          Share Reservation
        </Button>

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