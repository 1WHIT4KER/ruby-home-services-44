import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LeadManagementSettingsProps {
  autoAssignLeads: boolean;
  defaultQuoteExpiry: string;
  onAutoAssignLeadsChange: (checked: boolean) => void;
  onDefaultQuoteExpiryChange: (value: string) => void;
}

export const LeadManagementSettings = ({
  autoAssignLeads,
  defaultQuoteExpiry,
  onAutoAssignLeadsChange,
  onDefaultQuoteExpiryChange,
}: LeadManagementSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Management</CardTitle>
        <CardDescription>
          Configure how new leads are handled in the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-assign Leads</Label>
            <p className="text-sm text-muted-foreground">
              Automatically assign new leads to available team members
            </p>
          </div>
          <Switch
            checked={autoAssignLeads}
            onCheckedChange={onAutoAssignLeadsChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Default Quote Expiry (days)</Label>
          <Input
            type="number"
            value={defaultQuoteExpiry}
            onChange={(e) => onDefaultQuoteExpiryChange(e.target.value)}
            min="1"
            max="30"
          />
        </div>
      </CardContent>
    </Card>
  );
};