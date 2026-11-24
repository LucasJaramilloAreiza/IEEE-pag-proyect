"use client";
import { cn } from "@/lib/utils";
import type { ComponentProps, PointerEvent } from "react";

/**
 * Tarjeta con halo de luz que sigue al cursor (estilo Linear).
 * El efecto visual vive en la utilidad CSS `spotlight` (globals.css).
 */
export function SpotlightCard({ className, onPointerMove, ...props }: ComponentProps<"div">) {
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    onPointerMove?.(e);
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        "spotlight rounded-3xl border bg-card text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--brand)_35%,transparent)]",
        className
      )}
      {...props}
    />
  );
}
