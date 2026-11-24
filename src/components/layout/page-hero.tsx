import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";

/** Cabecera común de las páginas internas: cuadrícula técnica + halo de color. */
export function PageHero({
  eyebrow,
  title,
  description,
  tone = "brand",
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: "brand" | "wie";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div
        className={cn(
          "animate-blob pointer-events-none absolute -top-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full blur-3xl",
          tone === "wie" ? "bg-wie/20 dark:bg-wie/30" : "bg-ieee-cyan/20 dark:bg-ieee-blue/30"
        )}
      />
      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-20 text-center md:pb-20 md:pt-24">
        <div className="animate-in fade-in slide-in-from-bottom-3 space-y-5 duration-700">
          {eyebrow && (
            <Eyebrow className={tone === "wie" ? "border-wie/25 bg-wie/10 text-wie dark:text-purple-300" : undefined}>
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-4xl font-extrabold md:text-6xl">{title}</h1>
          {description && (
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
