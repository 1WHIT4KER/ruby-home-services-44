import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface NotificationSettingsProps {
  emailNotifications: boolean;
  onEmailNotificationsChange: (checked: boolean) => void;
}

export const NotificationSettings = ({
  emailNotifications,
  onEmailNotificationsChange,
}: NotificationSettingsProps) => {
  return (
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
            checked={emailNotifications}
            onCheckedChange={onEmailNotificationsChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};