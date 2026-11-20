import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabasePublicKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export function createSupabasePublicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient(getSupabaseUrl()!, getSupabasePublicKey()!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
