import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminNavbar } from "@/components/Admin/AdminNavbar";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("User is logged in, checking admin role...");
          const { data: roles, error: rolesError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', session.user.id);

          console.log("Roles query result:", { roles, rolesError });

          if (rolesError) {
            console.error("Error fetching roles:", rolesError);
            setErrorMessage("Error checking permissions. Please try again.");
            return;
          }

          // Check if user has any roles
          if (!roles || roles.length === 0) {
            console.log("No roles found, inserting admin role...");
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert([
                { user_id: session.user.id, role: 'admin' }
              ]);

            if (insertError) {
              console.error("Error setting admin role:", insertError);
              setErrorMessage("Error setting up permissions. Please try again.");
              return;
            }
          }

          // After inserting or if roles exist, redirect to dashboard
          console.log("Redirecting to dashboard...");
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error("Error in checkUser:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          const { data: roles, error: rolesError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', session.user.id);

          console.log("Roles after sign in:", { roles, rolesError });

          if (rolesError) {
            console.error("Error fetching roles after sign in:", rolesError);
            setErrorMessage("Error checking permissions. Please try again.");
            return;
          }

          // Check if user has any roles
          if (!roles || roles.length === 0) {
            console.log("No roles found after sign in, inserting admin role...");
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert([
                { user_id: session.user.id, role: 'admin' }
              ]);

            if (insertError) {
              console.error("Error setting admin role after sign in:", insertError);
              setErrorMessage("Error setting up permissions. Please try again.");
              return;
            }
          }

          // After inserting or if roles exist, redirect to dashboard
          console.log("Redirecting to dashboard after sign in...");
          navigate('/admin/dashboard');
        } catch (error) {
          console.error("Error in auth state change handler:", error);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="pt-24 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-ruby-red">Admin Access</h1>
            <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#E31C58',
                      brandAccent: '#C4184E',
                    },
                  },
                },
              }}
              providers={[]}
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;