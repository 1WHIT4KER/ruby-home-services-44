import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface FormSubmission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  appointment_date: string | null;
  notes: string | null;
  address: string;
  screen_cleaning: boolean;
  exterior_power_washing: boolean;
  gutter_cleaning: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
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

    checkAdmin();
  }, [navigate]);

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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ruby-red">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Form Submissions</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appointment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow 
                    key={submission.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleRowClick(submission)}
                  >
                    <TableCell>{formatDate(submission.created_at)}</TableCell>
                    <TableCell>
                      {submission.first_name} {submission.last_name}
                    </TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.phone}</TableCell>
                    <TableCell>
                      <span className="capitalize">{submission.status}</span>
                    </TableCell>
                    <TableCell>
                      {submission.appointment_date 
                        ? formatDate(submission.appointment_date)
                        : 'Not scheduled'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p>Name: {selectedSubmission.first_name} {selectedSubmission.last_name}</p>
                  <p>Email: {selectedSubmission.email}</p>
                  <p>Phone: {selectedSubmission.phone}</p>
                  <p>Address: {selectedSubmission.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Services Requested</h3>
                  <ul className="list-disc list-inside">
                    {selectedSubmission.screen_cleaning && <li>Screen Cleaning</li>}
                    {selectedSubmission.exterior_power_washing && <li>Exterior Power Washing</li>}
                    {selectedSubmission.gutter_cleaning && <li>Gutter Cleaning</li>}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this submission..."
                    className="h-32"
                  />
                </div>

                <Button onClick={handleUpdateSubmission} className="w-full">
                  Update Submission
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;