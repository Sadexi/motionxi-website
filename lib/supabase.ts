import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder"
);

export type Film = {
  id: string;
  title: string;
  year: number;
  genre: string;
  duration: string;
  synopsis: string;
  youtube_id: string | null;
  thumbnail_url: string | null;
  gradient: string | null;
  sort_order: number;
  created_at: string;
};

export type SiteContent = {
  key: string;
  value: string;
  updated_at: string;
};
