export interface FormSubmission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  appointment_date: string | null;
  notes: string | null;
  address: string;
  screen_cleaning: boolean;
  exterior_power_washing: boolean;
  gutter_cleaning: boolean;
}