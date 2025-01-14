import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Banknote, CheckSquare, Smartphone } from "lucide-react";

interface PaymentMethodPageProps {
  formData: {
    paymentMethod: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PaymentMethodPage = ({ formData, setFormData, onNext, onPrevious }: PaymentMethodPageProps) => {
  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: <Banknote className="h-5 w-5" /> },
    { id: 'check', label: 'Check', icon: <CheckSquare className="h-5 w-5" /> },
    { id: 'venmo', label: 'Venmo', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'zelle', label: 'Zelle', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'apple-cash', label: 'Apple Cash', icon: <Smartphone className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-ruby-red">Preferred payment method</h2>
        <p className="text-muted-foreground">
          Don't worry, you won't pay a penny until AFTER we've completed your service
        </p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-colors bg-white ${
              formData.paymentMethod === method.id 
                ? 'bg-[#ff3b4e1a] border-ruby-red' 
                : 'border hover:border-ruby-red'
            }`}
            onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-4">
                {method.icon}
                <CardTitle>{method.label}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        ))}
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

export default PaymentMethodPage;