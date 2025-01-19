import { useState, useEffect } from "react";
import { Mail, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Invitation {
  id: string;
  email: string;
  status: string;
  created_at: string;
  expires_at: string;
}

export const InvitationManagement = () => {
  const [email, setEmail] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInvitations = async () => {
    try {
      console.log('Fetching admin invitations...');
      const { data, error } = await supabase
        .from('admin_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Invitations fetched:', data);
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch invitations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to fetch invitations when component mounts
  useEffect(() => {
    fetchInvitations();
  }, []);

  const sendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      console.log('Sending admin invitation to:', email);
      const { error } = await supabase
        .from('admin_invitations')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });

      setEmail("");
      fetchInvitations();
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Send Admin Invitation</h2>
        <form onSubmit={sendInvitation} className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit">
            <UserPlus className="mr-2" />
            Send Invitation
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Pending Invitations</h2>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No invitations found
                    </TableCell>
                  </TableRow>
                ) : (
                  invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {invitation.email}
                      </TableCell>
                      <TableCell>{invitation.status}</TableCell>
                      <TableCell>
                        {new Date(invitation.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.expires_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};