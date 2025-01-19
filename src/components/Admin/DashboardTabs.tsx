import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTab {
  value: string;
  label: string;
  content: ReactNode;
}

interface DashboardTabsProps {
  tabs: DashboardTab[];
}

export const DashboardTabs = ({ tabs }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="bg-white rounded-lg shadow-md p-6">
            {tab.content}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};