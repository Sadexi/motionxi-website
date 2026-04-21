"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFilm(formData: FormData) {
  const title     = formData.get("title") as string;
  const year      = parseInt(formData.get("year") as string);
  const genre     = formData.get("genre") as string;
  const duration  = formData.get("duration") as string;
  const synopsis  = formData.get("synopsis") as string;
  const youtubeId = formData.get("youtube_id") as string;
  const thumbFile = formData.get("thumbnail") as File | null;

  let thumbnailUrl: string | null = null;
  if (thumbFile && thumbFile.size > 0) {
    const ext = thumbFile.name.split(".").pop();
    const path = `thumbnails/${Date.now()}.${ext}`;
    const bytes = await thumbFile.arrayBuffer();
    await supabaseAdmin.storage.from("motionxi-media").upload(path, Buffer.from(bytes), { contentType: thumbFile.type });
    const { data: urlData } = supabaseAdmin.storage.from("motionxi-media").getPublicUrl(path);
    thumbnailUrl = urlData.publicUrl;
  }

  const { data: maxRow } = await supabaseAdmin.from("films").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const sortOrder = (maxRow?.[0]?.sort_order ?? 0) + 1;

  await supabaseAdmin.from("films").insert({ title, year, genre, duration, synopsis, youtube_id: youtubeId || null, thumbnail_url: thumbnailUrl, sort_order: sortOrder });
  revalidatePath("/");
  revalidatePath("/admin/films");
  redirect("/admin/films");
}

export async function updateFilm(id: string, formData: FormData) {
  const title     = formData.get("title") as string;
  const year      = parseInt(formData.get("year") as string);
  const genre     = formData.get("genre") as string;
  const duration  = formData.get("duration") as string;
  const synopsis  = formData.get("synopsis") as string;
  const youtubeId = formData.get("youtube_id") as string;
  const thumbFile = formData.get("thumbnail") as File | null;

  const updates: Record<string, unknown> = { title, year, genre, duration, synopsis, youtube_id: youtubeId || null };

  if (thumbFile && thumbFile.size > 0) {
    const ext = thumbFile.name.split(".").pop();
    const path = `thumbnails/${Date.now()}.${ext}`;
    const bytes = await thumbFile.arrayBuffer();
    await supabaseAdmin.storage.from("motionxi-media").upload(path, Buffer.from(bytes), { contentType: thumbFile.type });
    const { data: urlData } = supabaseAdmin.storage.from("motionxi-media").getPublicUrl(path);
    updates.thumbnail_url = urlData.publicUrl;
  }

  await supabaseAdmin.from("films").update(updates).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/films");
  redirect("/admin/films");
}

export async function deleteFilm(id: string) {
  await supabaseAdmin.from("films").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/films");
}

export async function reorderFilms(ids: string[]) {
  await Promise.all(
    ids.map((id, i) => supabaseAdmin.from("films").update({ sort_order: i }).eq("id", id))
  );
  revalidatePath("/");
}
