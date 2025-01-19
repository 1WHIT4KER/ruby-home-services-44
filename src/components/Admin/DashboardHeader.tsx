import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export const DashboardHeader = ({ onSignOut }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-ruby-red">Admin Dashboard</h1>
      <Button variant="outline" onClick={onSignOut}>Sign Out</Button>
    </div>
  );
};