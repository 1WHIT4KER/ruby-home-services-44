import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Analytics } from "@/components/Admin/Analytics";
import { SubmissionsTable } from "@/components/Admin/SubmissionsTable";
import { SubmissionDetailsDialog } from "@/components/Admin/SubmissionDetailsDialog";
import { UserRolesTable } from "@/components/Admin/UserRolesTable";
import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { DashboardTabs } from "@/components/Admin/DashboardTabs";
import { Settings } from "@/components/Admin/Settings";
import { InvitationManagement } from "@/components/Admin/InvitationManagement";
import { FormSubmission } from "@/types/form";
import { AdminNavbar } from "@/components/Admin/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roles?.role !== 'admin') {
      navigate('/admin');
    }
    
    fetchSubmissions();
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const handleRowClick = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setNotes(submission.notes || "");
    setStatus(submission.status);
  };

  const handleUpdateSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({
          notes,
          status,
          viewed_at: new Date().toISOString(),
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Submission updated successfully",
      });

      fetchSubmissions();
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const dashboardTabs = [
    {
      value: "submissions",
      label: "Form Submissions",
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">Recent Form Submissions</h2>
          <SubmissionsTable 
            submissions={submissions}
            onRowClick={handleRowClick}
          />
        </>
      ),
    },
    {
      value: "analytics",
      label: "Analytics",
      content: <Analytics />,
    },
    {
      value: "users",
      label: "User Management",
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">User Role Management</h2>
          <UserRolesTable />
        </>
      ),
    },
    {
      value: "invitations",
      label: "Admin Invitations",
      content: <InvitationManagement />,
    },
    {
      value: "settings",
      label: "Settings",
      content: <Settings />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <DashboardHeader onSignOut={handleSignOut} />
          <DashboardTabs tabs={dashboardTabs} />
        </div>

        <SubmissionDetailsDialog
          submission={selectedSubmission}
          open={!!selectedSubmission}
          onOpenChange={(open) => !open && setSelectedSubmission(null)}
          notes={notes}
          status={status}
          onNotesChange={setNotes}
          onStatusChange={setStatus}
          onUpdate={handleUpdateSubmission}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;