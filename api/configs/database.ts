// api/configs/database.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const useSupabase = process.env.USE_SUPABASE === 'true';

let supabase: SupabaseClient | null = null;

if (useSupabase) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file.');
  }
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('Supabase is enabled.');
} else {
  console.warn('Supabase is disabled by configuration.');
}

export { supabase, useSupabase };
