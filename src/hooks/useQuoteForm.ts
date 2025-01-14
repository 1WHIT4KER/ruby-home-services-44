import { useState } from "react";

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  wantsInstantQuote: boolean;
  selectedContract: string;
  screenCleaning: boolean;
  exteriorPowerWashing: boolean;
  gutterCleaning: boolean;
  appointmentDate: Date | null;
  wantsReviewDiscount: boolean;
}

const initialFormData: QuoteFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  wantsInstantQuote: true,
  selectedContract: "",
  screenCleaning: false,
  exteriorPowerWashing: false,
  gutterCleaning: false,
  appointmentDate: null,
  wantsReviewDiscount: false
};

export const useQuoteForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(0);
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    resetForm
  };
};