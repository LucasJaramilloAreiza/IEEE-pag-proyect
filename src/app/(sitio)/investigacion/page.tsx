import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Bot, Code2, Cpu, ExternalLink, Globe2, HeartPulse, Microchip, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { getCapitulos, getProyectos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investigación",
  description: "Proyectos de investigación aplicada, publicaciones científicas y desarrollo de tecnologías avanzadas en la Rama Estudiantil IEEE UD.",
};

const ICONOS = { energia: Zap, robot: Bot, chip: Cpu, escudo: Shield, salud: HeartPulse, planeta: Globe2, codigo: Code2 } as const;

export default async function InvestigacionPage() {
  const [proyectos, capitulos] = await Promise.all([getProyectos(), getCapitulos()]);
  const siglas = new Map(capitulos.map((c) => [c.slug, c.sigla]));

  return (
    <>
      <PageHero
        eyebrow={<><BookOpen className="size-3.5" /> Unidad de I+D</>}
        title={<>Proyectos e <span className="text-gradient">investigación</span></>}
        description="Nuestros miembros y capítulos impulsan proyectos de ingeniería aplicada, divulgación científica y desarrollo tecnológico con reconocimiento nacional e internacional."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <Reveal>
          <SpotlightCard className="relative overflow-hidden p-8 md:p-12">
            <Microchip className="pointer-events-none absolute -right-6 -top-6 size-60 text-brand opacity-[0.06]" />
            <div className="relative max-w-2xl space-y-4">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Impacto científico y tecnológico</span>
              <h2 className="text-2xl font-extrabold md:text-3xl">Investigación abierta y colaborativa</h2>
              <p className="leading-relaxed text-muted-foreground">
                Fomentamos la publicación en cumbres como la IEEE Latin America & the Caribbean Semiconductor Summit (LACSS)
                y la integración directa con la industria tecnológica y de semiconductores.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button render={<Link href="/historias" />} className="group h-11 rounded-full px-6 font-semibold">
                  Leer historias <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button render={<Link href="/capitulos" />} variant="outline" className="h-11 rounded-full px-6 font-semibold">
                  Capítulos técnicos
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold">Líneas y proyectos destacados</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {proyectos.map((p, i) => {
              const Icon = ICONOS[p.icono] ?? Cpu;
              return (
                <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                  <SpotlightCard className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon className="size-6" /></span>
                      {p.estado && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                          <span className="size-1.5 rounded-full bg-emerald-500" /> {p.estado}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="mb-1 font-mono text-xs font-semibold text-brand">
                        {p.capitulo && siglas.has(p.capitulo) ? (
                          <Link href={`/capitulos/${p.capitulo}`} className="hover:underline">{p.responsables || `IEEE ${siglas.get(p.capitulo)}`}</Link>
                        ) : p.responsables}
                      </p>
                      <h3 className="text-xl font-bold leading-snug">{p.titulo}</h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{p.descripcion}</p>
                    {p.enlace && (
                      <a href={p.enlace} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                        {p.enlaceTexto || "Ver más"} <ExternalLink className="size-3.5" />
                      </a>
                    )}
                    {p.etiquetas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {p.etiquetas.map((t) => <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">#{t}</span>)}
                      </div>
                    )}
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
