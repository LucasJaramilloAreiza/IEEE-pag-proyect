import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ChapterExplorer } from "@/components/capitulos/chapter-explorer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SocietyLogo } from "@/components/ui/society-logo";
import { getCapitulos } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capítulos",
  description: "Capítulos técnicos y grupos de afinidad de la Rama Estudiantil IEEE Universidad Distrital.",
};

export default async function CapitulosPage() {
  const capitulos = await getCapitulos();

  return (
    <>
      <PageHero
        eyebrow="Ecosistema técnico"
        title="Nuestros capítulos"
        description="Los capítulos estudiantiles son la representación local de las sociedades técnicas del IEEE. Filtra por área y encuentra tu equipo."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <ChapterExplorer
          items={capitulos.map((c) => {
            const afinidad = c.tipo === "afinidad";
            return {
              slug: c.slug,
              area: c.area,
              card: (
                <Link href={`/capitulos/${c.slug}`} className="block h-full rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                  <SpotlightCard className="group flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", afinidad ? "bg-ud-gold/15 text-amber-700 dark:text-ud-gold" : "bg-brand-soft text-brand")}>
                        {afinidad ? "Grupo de afinidad" : "Capítulo técnico"}
                      </span>
                      <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                    <SocietyLogo claro={c.logoClaro} oscuro={c.logoOscuro} alt={c.sigla} className="mx-auto my-6 size-28 transition-transform duration-300 group-hover:scale-105" />
                    <h2 className="text-lg font-bold leading-snug">{c.nombre}</h2>
                    {c.pilares.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {c.pilares.map((p) => (
                          <span key={p} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{p}</span>
                        ))}
                      </div>
                    )}
                  </SpotlightCard>
                </Link>
              ),
            };
          })}
        />
      </div>
    </>
  );
}
