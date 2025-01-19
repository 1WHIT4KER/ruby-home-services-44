import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          console.log("Roles query result:", { roles, rolesError });

          if (rolesError) {
            console.error("Error fetching roles:", rolesError);
            setErrorMessage("Error checking permissions. Please try again.");
            return;
          }

          if (roles?.role === 'admin') {
            console.log("User is admin, redirecting to dashboard...");
            navigate('/admin/dashboard');
          } else {
            console.log("User is not admin:", roles);
            setErrorMessage("You don't have permission to access this area.");
            await supabase.auth.signOut();
          }
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
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          console.log("Roles after sign in:", { roles, rolesError });

          if (rolesError) {
            console.error("Error fetching roles after sign in:", rolesError);
            setErrorMessage("Error checking permissions. Please try again.");
            return;
          }

          if (roles?.role === 'admin') {
            console.log("User is admin, redirecting to dashboard...");
            navigate('/admin/dashboard');
          } else {
            console.log("User is not admin:", roles);
            setErrorMessage("You don't have permission to access this area.");
            await supabase.auth.signOut();
          }
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