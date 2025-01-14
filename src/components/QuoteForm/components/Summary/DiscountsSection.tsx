interface DiscountsSectionProps {
  wantsReviewDiscount: boolean;
}

export const DiscountsSection = ({ wantsReviewDiscount }: DiscountsSectionProps) => {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Discounts
      </h3>
      <div className="space-y-1 text-sm">
        {wantsReviewDiscount && (
          <p>• Review Discount: $20 off your service for writing a review</p>
        )}
      </div>
    </section>
  );
};