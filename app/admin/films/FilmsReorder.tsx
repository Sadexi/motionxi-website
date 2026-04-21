"use client";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useTransition } from "react";
import Link from "next/link";
import { reorderFilms } from "@/app/actions/films";
import DeleteFilmBtn from "./DeleteFilmBtn";
import type { Film } from "@/lib/supabase";

function SortableRow({ film }: { film: Film }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: film.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}
    >
      <span
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", color: "var(--c-muted)", fontSize: "1.1rem", userSelect: "none", touchAction: "none" }}
        title="Drag to reorder"
      >⠿</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--f-serif)", fontSize: "0.95rem", fontWeight: 600, color: "var(--c-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{film.title}</p>
        <p style={{ fontSize: "0.68rem", color: "var(--c-muted)", marginTop: "0.1rem" }}>{film.year} · {film.genre} · {film.duration}</p>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <Link href={`/admin/films/${film.id}/edit`} className="admin-btn admin-btn-ghost">Edit</Link>
        <DeleteFilmBtn id={film.id} />
      </div>
    </div>
  );
}

export default function FilmsReorder({ films: initial }: { films: Film[] }) {
  const [films, setFilms] = useState(initial);
  const [, startTransition] = useTransition();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = films.findIndex((f) => f.id === active.id);
    const newIndex = films.findIndex((f) => f.id === over.id);
    const reordered = arrayMove(films, oldIndex, newIndex);
    setFilms(reordered);
    startTransition(() => reorderFilms(reordered.map((f) => f.id)));
  };

  return (
    <div style={{ border: "1px solid var(--c-border)" }}>
      <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--c-border)", background: "var(--c-raised)", display: "flex", gap: "1rem" }}>
        <span style={{ flex: 1, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-muted)" }}>Title</span>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-muted)" }}>Actions</span>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={films.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {films.map((f) => <SortableRow key={f.id} film={f} />)}
        </SortableContext>
      </DndContext>
    </div>
  );
}
