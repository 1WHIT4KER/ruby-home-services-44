import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthError } from '@supabase/supabase-js';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const setupAdminRole = async (userId: string) => {
    console.log("Setting up admin role for user:", userId);
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert([{ user_id: userId, role: 'admin' }]);

    if (insertError) {
      console.error("Error setting admin role:", insertError);
      throw new Error("Error setting up permissions");
    }
    console.log("Successfully set up admin role for user:", userId);
  };

  const checkAndSetupAdminRole = async (userId: string) => {
    console.log("Checking admin role for user:", userId);
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (rolesError) {
      console.error("Error fetching roles:", rolesError);
      if (rolesError.code === 'PGRST116') {
        console.log("No role found, setting up admin role");
        await setupAdminRole(userId);
      } else {
        throw new Error("Error checking permissions");
      }
    }

    if (!roles) {
      console.log("No role found, setting up admin role");
      await setupAdminRole(userId);
    } else {
      console.log("Found existing role:", roles);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session);
        
        if (session) {
          await checkAndSetupAdminRole(session.user.id);
          console.log("Admin role check complete, redirecting to dashboard");
          navigate('/admin/dashboard');
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          await checkAndSetupAdminRole(session.user.id);
          console.log("Admin role check complete after sign in, redirecting to dashboard");
          navigate('/admin/dashboard');
        } catch (error) {
          console.error("Error in auth state change handler:", error);
          setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return { errorMessage };
};