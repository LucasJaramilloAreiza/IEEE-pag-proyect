"use client";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENT_TYPE_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";

/** Filtro por tipo de evento. Recibe las tarjetas ya renderizadas en el servidor. */
export function EventExplorer({ items }: { items: { slug: string; tipo: string; card: ReactNode }[] }) {
  const [filter, setFilter] = useState<string>("ALL");
  const types = Array.from(new Set(items.map((e) => e.tipo)));
  const visible = filter === "ALL" ? items : items.filter((e) => e.tipo === filter);

  const chip = (value: string, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        filter === value
          ? "border-brand bg-brand text-primary-foreground shadow-md shadow-brand/25"
          : "bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por tipo de evento">
        {chip("ALL", "Todos")}
        {types.map((t) => chip(t, EVENT_TYPE_LABELS[t] ?? t))}
      </div>
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((evt) => (
            <motion.div
              key={evt.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              {evt.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
