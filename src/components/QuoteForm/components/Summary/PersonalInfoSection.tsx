import { format } from "date-fns";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  homeType: "single" | "multi" | "";
}

export const PersonalInfoSection = ({
  firstName,
  lastName,
  phone,
  email,
  streetAddress,
  unit,
  city,
  state,
  homeType,
}: PersonalInfoProps) => {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Personal Information
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="block text-muted-foreground">Name</span>
          <span>{firstName} {lastName}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Phone</span>
          <span>{phone}</span>
        </div>
        {email && (
          <div className="col-span-2">
            <span className="block text-muted-foreground">Email</span>
            <span>{email}</span>
          </div>
        )}
        <div className="col-span-2">
          <span className="block text-muted-foreground">Address</span>
          <span>{streetAddress}{unit ? `, ${unit}` : ''}, {city}, {state}</span>
        </div>
        {homeType && (
          <div className="col-span-2">
            <span className="block text-muted-foreground">Home Type</span>
            <span>{homeType === 'single' ? 'Single Story' : 'Multi Story'}</span>
          </div>
        )}
      </div>
    </section>
  );
};