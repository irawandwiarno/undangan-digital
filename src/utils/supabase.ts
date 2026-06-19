import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and publishable key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── CLIENTS ────────────────────────────────────────────

export async function fetchClientBySlug(slug: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// ─── GUESTS ─────────────────────────────────────────────

export async function fetchGuests(clientId: string) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createGuest(guest: {
  name: string;
  message: string;
  attendance: string;
  client_id: string;
}) {
  const { data, error } = await supabase
    .from('guests')
    .insert([guest])
    .select();

  if (error) throw error;
  return data ?? [];
}