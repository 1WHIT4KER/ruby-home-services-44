import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsData {
  totalSubmissions: number;
  conversionRate: number;
  serviceBreakdown: {
    name: string;
    value: number;
  }[];
  submissionsByStatus: {
    status: string;
    count: number;
  }[];
}

const COLORS = ["#FF3B4E", "#FF8C94", "#FFB6B9", "#FFC8CC"];

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSubmissions: 0,
    conversionRate: 0,
    serviceBreakdown: [],
    submissionsByStatus: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      console.log("Fetching analytics data...");
      const { data: submissions, error } = await supabase
        .from("form_submissions")
        .select("*");

      if (error) throw error;

      console.log("Received submissions:", submissions);

      // Calculate total submissions
      const totalSubmissions = submissions.length;

      // Calculate service breakdown
      const services = [
        { name: "Screen Cleaning", key: "screen_cleaning" },
        { name: "Power Washing", key: "exterior_power_washing" },
        { name: "Gutter Cleaning", key: "gutter_cleaning" },
      ];

      const serviceBreakdown = services.map(({ name, key }) => ({
        name,
        value: submissions.filter((s: any) => s[key]).length,
      }));

      // Calculate submissions by status
      const statusCounts: { [key: string]: number } = {};
      submissions.forEach((submission: any) => {
        statusCounts[submission.status] = (statusCounts[submission.status] || 0) + 1;
      });

      const submissionsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
      }));

      // Calculate conversion rate (completed / total)
      const completedSubmissions = submissions.filter(
        (s: any) => s.status === "completed"
      ).length;
      const conversionRate = (completedSubmissions / totalSubmissions) * 100;

      setAnalyticsData({
        totalSubmissions,
        conversionRate,
        serviceBreakdown,
        submissionsByStatus,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Submissions</CardTitle>
            <CardDescription>Overall form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ruby-red">
              {analyticsData.totalSubmissions}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Completed submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ruby-red">
              {analyticsData.conversionRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Breakdown</CardTitle>
            <CardDescription>Popular services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {analyticsData.serviceBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submissions by Status</CardTitle>
            <CardDescription>Current status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.submissionsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF3B4E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};