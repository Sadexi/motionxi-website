"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateContent(key: string, value: string) {
  await supabaseAdmin
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  revalidatePath("/");
}

export async function updateMultipleContent(entries: { key: string; value: string }[]) {
  await Promise.all(entries.map(({ key, value }) => updateContent(key, value)));
}

export async function uploadAboutImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file || file.size === 0) return;
  const ext  = file.name.split(".").pop();
  const path = `about/profile.${ext}`;
  const bytes = await file.arrayBuffer();
  await supabaseAdmin.storage.from("motionxi-media").upload(path, Buffer.from(bytes), { contentType: file.type, upsert: true });
  const { data } = supabaseAdmin.storage.from("motionxi-media").getPublicUrl(path);
  await updateContent("about_image", data.publicUrl);
  revalidatePath("/");
}
