export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabasePublicKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const publicKey = getSupabasePublicKey();

  if (!url || !publicKey) {
    return false;
  }

  if (
    url.includes("[ISI_NANTI]") ||
    url.includes("your-project-ref") ||
    publicKey.includes("[ISI_NANTI]") ||
    publicKey.includes("your-supabase-anon-key")
  ) {
    return false;
  }

  return url.startsWith("http://") || url.startsWith("https://");
}
