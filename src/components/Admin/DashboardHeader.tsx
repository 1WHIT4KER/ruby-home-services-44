import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export const DashboardHeader = ({ onSignOut }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/77ce0bf0-17d7-43e2-b81f-3a314b8484c0.png"
            alt="Ruby Logo"
            className="h-12"
          />
        </Link>
        <h1 className="text-2xl font-bold text-ruby-red">Admin Dashboard</h1>
      </div>
      <Button variant="outline" onClick={onSignOut}>Sign Out</Button>
    </div>
  );
};