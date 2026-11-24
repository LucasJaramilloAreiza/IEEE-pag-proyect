import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { EventExplorer } from "@/components/memorias/event-explorer";
import { EventCard } from "@/components/eventos/event-card";
import { getCapitulos, getMemorias } from "@/lib/content";

export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Memorias",
  description: "Registro de cumbres, congresos, talleres y visitas técnicas de la Rama Estudiantil IEEE UD.",
};

export default async function MemoriasPage() {
  const [memorias, capitulos] = await Promise.all([getMemorias(), getCapitulos()]);
  const anios = new Set(memorias.map((m) => m.fechaInicio.slice(0, 4))).size;
  const stats = [
    { value: memorias.length, label: "Memorias registradas" },
    { value: capitulos.length, label: "Capítulos en el portal" },
    { value: anios, label: anios === 1 ? "Año documentado" : "Años documentados" },
  ];

  return (
    <>
      <PageHero
        eyebrow={<><BookOpen className="size-3.5" /> Archivo de actividades</>}
        title={<>Memorias <span className="text-gradient">IEEE UD</span></>}
        description="Cumbres, congresos, talleres y visitas técnicas organizados por la Rama Estudiantil y sus capítulos."
      >
        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card/70 p-4 backdrop-blur">
              <div className="text-2xl font-extrabold text-brand md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <EventExplorer items={memorias.map((e) => ({ slug: e.slug, tipo: e.tipo, card: <EventCard event={e} /> }))} />
      </div>
    </>
  );
}
