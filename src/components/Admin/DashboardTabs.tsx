import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./Settings";

interface DashboardTabsProps {
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
}

export const DashboardTabs = ({ tabs }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="space-y-4">
      <TabsList className="w-full justify-start">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};