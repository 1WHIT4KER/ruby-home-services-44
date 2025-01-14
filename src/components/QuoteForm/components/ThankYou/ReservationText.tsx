import { format } from "date-fns";

interface ReservationTextProps {
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
}

export const getReservationText = ({ formData }: ReservationTextProps) => {
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