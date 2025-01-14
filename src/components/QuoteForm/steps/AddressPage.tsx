import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddressPageProps {
  formData: {
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    homeType: "single" | "multi" | "";
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AddressPage = ({ formData, setFormData, onNext, onPrevious }: AddressPageProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">How far are you?</h2>
        <p className="text-muted-foreground">
          Proudly servicing Salt Lake and Utah counties.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address *</Label>
          <Input
            id="streetAddress"
            required
            value={formData.streetAddress}
            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            placeholder="Enter your street address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Apt., suite, unit, building, floor, etc.</Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter your city"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="Enter your state"
          />
        </div>

        <div className="space-y-2">
          <Label>Home Type</Label>
          <RadioGroup
            value={formData.homeType}
            onValueChange={(value) => setFormData({ ...formData, homeType: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single Story</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi" id="multi" />
              <Label htmlFor="multi">Multi Story</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default AddressPage;