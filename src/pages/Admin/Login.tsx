import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminNavbar } from "@/components/Admin/AdminNavbar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const { errorMessage } = useAdminAuth();

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