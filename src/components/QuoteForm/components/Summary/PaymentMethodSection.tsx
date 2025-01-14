interface PaymentMethodSectionProps {
  paymentMethod: string;
}

export const PaymentMethodSection = ({ paymentMethod }: PaymentMethodSectionProps) => {
  const formatPaymentMethod = (method: string) => {
    if (!method) return '';
    return method.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return paymentMethod ? (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Payment Method
      </h3>
      <p className="text-sm">
        {formatPaymentMethod(paymentMethod)}
      </p>
    </section>
  ) : null;
};