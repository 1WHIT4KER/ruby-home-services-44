import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
      
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ruby-red">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for dashboard content - we'll implement these features next */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Form Submissions</h2>
            <p className="text-muted-foreground">View and manage form submissions</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">User Management</h2>
            <p className="text-muted-foreground">Manage admin access and roles</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Analytics</h2>
            <p className="text-muted-foreground">View site statistics and metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;