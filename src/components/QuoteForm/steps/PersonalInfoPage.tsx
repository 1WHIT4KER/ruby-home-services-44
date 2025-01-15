import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoPageProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PersonalInfoPage = ({ formData, setFormData, onNext, onPrevious }: PersonalInfoPageProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2 text-center px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-ruby-red">Let's get to know you!</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Don't worry, we value privacy as much as you do...your info will never be shared.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm sm:text-base">First Name *</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="h-10 sm:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm sm:text-base">Last Name *</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="h-10 sm:h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-10 sm:h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-10 sm:h-11"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4 sm:pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
        >
          Previous
        </Button>
        <Button 
          type="submit"
          className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoPage;