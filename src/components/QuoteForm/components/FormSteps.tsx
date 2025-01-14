import WelcomePage from "../steps/WelcomePage";
import PersonalInfoPage from "../steps/PersonalInfoPage";
import AddressPage from "../steps/AddressPage";
import QuoteCalculatorPage from "../steps/QuoteCalculatorPage";
import ContractSelectionPage from "../steps/ContractSelectionPage";
import AdditionalServicesPage from "../steps/AdditionalServicesPage";
import SchedulingPage from "../steps/SchedulingPage";
import ReviewOfferPage from "../steps/ReviewOfferPage";
import PaymentMethodPage from "../steps/PaymentMethodPage";
import SummaryPage from "../steps/SummaryPage";
import ThankYouPage from "../steps/ThankYouPage";
import { QuoteFormData } from "@/hooks/useQuoteForm";

interface FormStepsProps {
  step: number;
  setStep: (step: number) => void;
  formData: QuoteFormData;
  setFormData: (data: QuoteFormData) => void;
  onClose: () => void;
}

export const FormSteps = ({ step, setStep, formData, setFormData, onClose }: FormStepsProps) => {
  const steps = [
    <WelcomePage onNext={() => setStep(1)} />,
    <PersonalInfoPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(2)}
      onPrevious={() => setStep(0)}
    />,
    <AddressPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(3)}
      onPrevious={() => setStep(1)}
    />,
    <QuoteCalculatorPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(4)}
      onPrevious={() => setStep(2)}
    />,
    <ContractSelectionPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(5)}
      onPrevious={() => setStep(3)}
    />,
    <AdditionalServicesPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(6)}
      onPrevious={() => setStep(4)}
    />,
    <SchedulingPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(7)}
      onPrevious={() => setStep(5)}
    />,
    <ReviewOfferPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(8)}
      onPrevious={() => setStep(6)}
    />,
    <PaymentMethodPage 
      formData={formData}
      setFormData={setFormData}
      onNext={() => setStep(9)}
      onPrevious={() => setStep(7)}
    />,
    <SummaryPage 
      formData={formData}
      onNext={() => setStep(10)}
      onPrevious={() => setStep(8)}
    />,
    <ThankYouPage 
      formData={formData}
      onClose={() => {
        setStep(0);
        onClose();
      }}
    />
  ];

  return steps[step];
};