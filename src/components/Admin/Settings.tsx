import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoAssignLeads: false,
    defaultQuoteExpiry: "7",
  });

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // TODO: Implement settings persistence
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how you want to receive notifications about new submissions and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new form submissions
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

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
              checked={settings.autoAssignLeads}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, autoAssignLeads: checked }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Default Quote Expiry (days)</Label>
            <Input
              type="number"
              value={settings.defaultQuoteExpiry}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  defaultQuoteExpiry: e.target.value,
                }))
              }
              min="1"
              max="30"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};