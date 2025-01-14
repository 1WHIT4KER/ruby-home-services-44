interface ServicesSectionProps {
  screenCleaning: boolean;
  exteriorPowerWashing: boolean;
  gutterCleaning: boolean;
}

export const ServicesSection = ({
  screenCleaning,
  exteriorPowerWashing,
  gutterCleaning,
}: ServicesSectionProps) => {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Selected Services
      </h3>
      <div className="space-y-1 text-sm">
        {screenCleaning && <p>• Screen Cleaning ($4 per screen)</p>}
        {exteriorPowerWashing && <p>• Exterior Power Washing ($150)</p>}
        {gutterCleaning && <p>• Gutter Cleaning ($100-$200)</p>}
      </div>
    </section>
  );
};