import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and publishable key must be provided in .env as VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchGuests() {
  const { data, error } = await supabase.from('guests').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export async function createGuest(guest: { name: string; message: string; attendance: string }) {
  const { data, error } = await supabase
    .from('guests')
    .insert([guest])
    .select();

  if (error) {
    throw error;
  }

  return data ?? [];
}
