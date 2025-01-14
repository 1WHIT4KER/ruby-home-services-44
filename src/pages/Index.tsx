import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { QuoteFormDialog } from "@/components/QuoteForm/QuoteFormDialog";
import { useState } from "react";

const Index = () => {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Reviews />
      <QuoteFormDialog 
        open={quoteFormOpen}
        onOpenChange={setQuoteFormOpen}
      />
    </main>
  );
};

export default Index;