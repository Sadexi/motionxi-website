"use client";
import { deleteFilm } from "@/app/actions/films";
import { useTransition } from "react";

export default function DeleteFilmBtn({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      className="admin-btn admin-btn-danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this film? This cannot be undone.")) return;
        startTransition(() => deleteFilm(id));
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
