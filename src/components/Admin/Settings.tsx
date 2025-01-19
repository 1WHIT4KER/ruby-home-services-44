import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { NotificationSettings } from "./Settings/NotificationSettings";
import { LeadManagementSettings } from "./Settings/LeadManagementSettings";

export const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoAssignLeads: false,
    defaultQuoteExpiry: "7",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      console.log("Fetching settings from Supabase...");
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        console.log("Settings fetched successfully:", data);
        setSettings({
          emailNotifications: data.email_notifications,
          autoAssignLeads: data.auto_assign_leads,
          defaultQuoteExpiry: data.default_quote_expiry.toString(),
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      console.log("Saving settings to Supabase...");
      const { error } = await supabase
        .from("app_settings")
        .update({
          email_notifications: settings.emailNotifications,
          auto_assign_leads: settings.autoAssignLeads,
          default_quote_expiry: parseInt(settings.defaultQuoteExpiry),
        })
        .eq("id", (await supabase.from("app_settings").select("id").single()).data?.id);

      if (error) throw error;

      console.log("Settings saved successfully");
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
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <NotificationSettings
        emailNotifications={settings.emailNotifications}
        onEmailNotificationsChange={(checked) =>
          setSettings((prev) => ({ ...prev, emailNotifications: checked }))
        }
      />

      <LeadManagementSettings
        autoAssignLeads={settings.autoAssignLeads}
        defaultQuoteExpiry={settings.defaultQuoteExpiry}
        onAutoAssignLeadsChange={(checked) =>
          setSettings((prev) => ({ ...prev, autoAssignLeads: checked }))
        }
        onDefaultQuoteExpiryChange={(value) =>
          setSettings((prev) => ({ ...prev, defaultQuoteExpiry: value }))
        }
      />

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};