import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminNavbar } from "@/components/Admin/AdminNavbar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const { errorMessage } = useAdminAuth();
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'USER_UPDATED') {
        setAuthError("");
      }
      if (event === 'SIGNED_OUT') {
        setAuthError("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="pt-24 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-ruby-red">Admin Access</h1>
            <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
          </div>

          {(errorMessage || authError) && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage || authError}</AlertDescription>
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
              onError={(error: AuthError) => {
                console.error("Auth error:", error);
                if (error.message.includes("invalid_credentials")) {
                  setAuthError("Invalid email or password. Please check your credentials and try again.");
                } else if (error.message.includes("Email not confirmed")) {
                  setAuthError("Please verify your email address before signing in.");
                } else {
                  setAuthError(error.message);
                }
              }}
            />
          </div>

          <p className="text-sm text-center text-muted-foreground">
            Note: If you haven't received an admin invitation, please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;