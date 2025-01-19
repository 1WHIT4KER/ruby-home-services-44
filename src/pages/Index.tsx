import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { QuoteFormDialog } from "@/components/QuoteForm/QuoteFormDialog";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="relative">
      <Navbar onQuoteClick={() => setShowQuoteForm(true)} />
      <Hero onQuoteClick={() => setShowQuoteForm(true)} />
      <Services />
      <Reviews />
      <Footer />
      <QuoteFormDialog 
        open={showQuoteForm} 
        onOpenChange={setShowQuoteForm} 
      />
    </div>
  );
};

export default Index;