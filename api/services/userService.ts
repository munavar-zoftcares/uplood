// api/services/userService.ts
import { supabase, useSupabase } from '../configs/database';

export const deleteUserAccount = async (userId: string): Promise<void> => {
  if (!useSupabase || !supabase) {
    console.warn('Supabase is disabled. Skipping deletion.');
    return;
  }
  
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    throw error;
  }
};
