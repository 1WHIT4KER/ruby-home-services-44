import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcxdjwfkvzweiuyoxuyx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGRqd2Zrdnp3ZWl1eW94dXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MzY4MDAsImV4cCI6MjAyMTAxMjgwMH0.Wd0VQmGwZGzHXBkBrDgqJPY0bhnhI_cTMsQ_uFPbQ7Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});