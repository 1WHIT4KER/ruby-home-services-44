import { format } from "date-fns";

interface AppointmentSectionProps {
  appointmentDate: Date | null;
}

export const AppointmentSection = ({ appointmentDate }: AppointmentSectionProps) => {
  if (!appointmentDate) return null;

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Appointment
      </h3>
      <p className="text-sm">
        {format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")}
      </p>
    </section>
  );
};