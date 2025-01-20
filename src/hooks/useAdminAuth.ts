import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const setupAdminRole = async (userId: string) => {
    console.log("Setting up admin role for user:", userId);
    try {
      const { data, error: insertError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: 'admin' }])
        .select()
        .single();

      if (insertError) {
        console.error("Error setting admin role:", insertError);
        throw new Error("Error setting up permissions");
      }
      
      console.log("Successfully set up admin role for user:", userId, "Data:", data);
      return data;
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
        .eq('role', 'admin')
        .maybeSingle();

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        throw rolesError;
      }

      if (!roles) {
        console.log("No admin role found, setting up admin role");
        return await setupAdminRole(userId);
      }
      
      console.log("Found existing admin role:", roles);
      return roles;
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
        
        if (!session) {
          console.log("No active session found");
          if (isSubscribed) navigate('/admin');
          return;
        }

        if (isSubscribed) {
          const role = await checkAndSetupAdminRole(session.user.id);
          if (role) {
            console.log("Admin role confirmed, redirecting to dashboard");
            navigate('/admin/dashboard');
          } else {
            console.log("No admin role found after check");
            navigate('/admin');
          }
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
          const role = await checkAndSetupAdminRole(session.user.id);
          if (role) {
            console.log("Admin role confirmed after sign in, redirecting to dashboard");
            navigate('/admin/dashboard');
          } else {
            console.log("No admin role found after sign in");
            navigate('/admin');
          }
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