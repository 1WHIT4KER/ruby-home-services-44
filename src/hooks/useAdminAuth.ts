import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const setupAdminRole = async (userId: string) => {
    console.log("Setting up admin role for user:", userId);
    try {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: 'admin' }]);

      if (insertError) {
        console.error("Error setting admin role:", insertError);
        throw new Error("Error setting up permissions");
      }
      console.log("Successfully set up admin role for user:", userId);
    } catch (error) {
      console.error("Error in setupAdminRole:", error);
      throw error;
    }
  };

  const checkAndSetupAdminRole = async (userId: string) => {
    console.log("Checking admin role for user:", userId);
    try {
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        throw rolesError;
      }

      if (!roles) {
        console.log("No role found, setting up admin role");
        await setupAdminRole(userId);
      } else {
        console.log("Found existing role:", roles);
      }
    } catch (error) {
      console.error("Error in checkAndSetupAdminRole:", error);
      throw error;
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session);
        
        if (session && isSubscribed) {
          await checkAndSetupAdminRole(session.user.id);
          console.log("Admin role check complete, redirecting to dashboard");
          navigate('/admin/dashboard');
        } else if (!session && isSubscribed) {
          console.log("No active session found");
          navigate('/admin');
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        if (isSubscribed) {
          setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
          navigate('/admin');
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session && isSubscribed) {
        try {
          await checkAndSetupAdminRole(session.user.id);
          console.log("Admin role check complete after sign in, redirecting to dashboard");
          navigate('/admin/dashboard');
        } catch (error) {
          console.error("Error in auth state change handler:", error);
          if (isSubscribed) {
            setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
            navigate('/admin');
          }
        }
      } else if (event === 'SIGNED_OUT' && isSubscribed) {
        navigate('/admin');
      }
    });

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { errorMessage };
};