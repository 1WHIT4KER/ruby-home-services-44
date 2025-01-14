import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { getReservationText } from "./ReservationText";

interface ActionButtonsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    appointmentDate: Date | null;
    selectedContract: string;
    screenCleaning: boolean;
    exteriorPowerWashing: boolean;
    gutterCleaning: boolean;
  };
  onClose: () => void;
}

export const ActionButtons = ({ formData, onClose }: ActionButtonsProps) => {
  const downloadAsPDF = () => {
    const blob = new Blob([getReservationText({ formData })], { type: 'text/plain' });
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
    const text = getReservationText({ formData });
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Window Cleaning Service Reservation',
          text: text,
        });
        return;
      }

      await navigator.clipboard.writeText(text);
      toast.success("Reservation details copied to clipboard!");
    } catch (error) {
      console.log('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Reservation details copied to clipboard!");
      } catch (clipboardError) {
        toast.error("Couldn't share the reservation. Please try downloading instead.");
      }
    }
  };

  return (
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
  );
};