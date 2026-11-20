export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return false;
  }

  if (
    url.includes("[ISI_NANTI]") ||
    url.includes("your-project-ref") ||
    anonKey.includes("[ISI_NANTI]") ||
    anonKey.includes("your-supabase-anon-key")
  ) {
    return false;
  }

  return url.startsWith("http://") || url.startsWith("https://");
}
