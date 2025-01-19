import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcxdjwfkvzweiuyoxuyx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGRqd2Zrdnp3ZWl1eW94dXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MTc3MzksImV4cCI6MjA1MjM5MzczOX0.S_8pLnoBpxp1950WXPXMVHxyxMYyjIxSqUMlHbuzQCE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
});