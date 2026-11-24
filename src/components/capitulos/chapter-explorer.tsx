"use client";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AREA_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";

/** Filtro por área. Recibe las tarjetas ya renderizadas en el servidor. */
export function ChapterExplorer({ items }: { items: { slug: string; area: string; card: ReactNode }[] }) {
  const [filter, setFilter] = useState("todos");
  const areas = Object.keys(AREA_LABELS).filter((a) => items.some((c) => c.area === a));
  const visible = filter === "todos" ? items : items.filter((c) => c.area === filter);

  const chip = (value: string, label: string, count: number) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        filter === value
          ? "border-brand bg-brand text-primary-foreground shadow-md shadow-brand/25"
          : "bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
      )}
    >
      {label}
      <span className={cn("rounded-full px-1.5 text-xs", filter === value ? "bg-white/20" : "bg-muted")}>{count}</span>
    </button>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar capítulos por área">
        {chip("todos", "Todos", items.length)}
        {areas.map((a) => chip(a, AREA_LABELS[a], items.filter((c) => c.area === a).length))}
      </div>
      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((c) => (
            <motion.div
              key={c.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              {c.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
