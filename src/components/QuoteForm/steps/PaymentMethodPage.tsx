import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    { id: 'cash', label: 'Cash', icon: <Banknote className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 'check', label: 'Check', icon: <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 'venmo', label: 'Venmo', icon: <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 'zelle', label: 'Zelle', icon: <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 'apple-cash', label: 'Apple Cash', icon: <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-ruby-red">Preferred payment method</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Don't worry, you won't pay a penny until AFTER we've completed your service
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
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
            <CardHeader className="flex flex-row items-center space-y-0 py-3 sm:py-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {method.icon}
                <CardTitle className="text-sm sm:text-base">{method.label}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodPage;