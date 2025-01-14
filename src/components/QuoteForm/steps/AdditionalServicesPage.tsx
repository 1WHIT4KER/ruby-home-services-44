import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalServicesPageProps {
  formData: {
    screenCleaning: boolean;
    exteriorPowerWashing: boolean;
    gutterCleaning: boolean;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AdditionalServicesPage = ({ formData, setFormData, onNext, onPrevious }: AdditionalServicesPageProps) => {
  const toggleService = (service: keyof typeof formData) => {
    setFormData({ ...formData, [service]: !formData[service] });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">Additional Services</h2>
        <p className="text-muted-foreground">
          Enhance your service with these add-ons
        </p>
      </div>

      <div className="space-y-4">
        <Card 
          className={`cursor-pointer transition-colors ${
            formData.screenCleaning 
              ? 'bg-[#ff3b4e1a] border-ruby-red' 
              : 'hover:border-ruby-red'
          }`}
          onClick={() => toggleService('screenCleaning')}
        >
          <CardHeader>
            <CardTitle>Screen Cleaning</CardTitle>
            <CardDescription>Extra $4 per screen</CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-colors ${
            formData.exteriorPowerWashing 
              ? 'bg-[#ff3b4e1a] border-ruby-red' 
              : 'hover:border-ruby-red'
          }`}
          onClick={() => toggleService('exteriorPowerWashing')}
        >
          <CardHeader>
            <CardTitle>Exterior Power Washing</CardTitle>
            <CardDescription>$150</CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-colors ${
            formData.gutterCleaning 
              ? 'bg-[#ff3b4e1a] border-ruby-red' 
              : 'hover:border-ruby-red'
          }`}
          onClick={() => toggleService('gutterCleaning')}
        >
          <CardHeader>
            <CardTitle>Gutter Cleaning</CardTitle>
            <CardDescription>$100-$200</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default AdditionalServicesPage;