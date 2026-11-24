import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Bot, Code2, Cpu, ExternalLink, HeartPulse, Mail, Globe2, Shield, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { SocietyLogo } from "@/components/ui/society-logo";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { UpcomingList } from "@/components/eventos/upcoming-list";
import { EventCard } from "@/components/eventos/event-card";
import { AREA_LABELS } from "@/lib/labels";
import { getCapitulo, getCapitulos, getEventos, getProyectos, getSitio } from "@/lib/content";

export const revalidate = 43200;

type Props = { params: Promise<{ slug: string }> };

const ICONOS = { energia: Zap, robot: Bot, chip: Cpu, escudo: Shield, salud: HeartPulse, planeta: Globe2, codigo: Code2 } as const;

export async function generateStaticParams() {
  return (await getCapitulos()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCapitulo((await params).slug);
  if (!c) return {};
  return { title: c.nombre, description: c.proposito };
}

export default async function CapituloPage({ params }: Props) {
  const capitulo = await getCapitulo((await params).slug);
  if (!capitulo) notFound();

  const [eventos, proyectos, sitio] = await Promise.all([getEventos(), getProyectos(), getSitio()]);
  const propios = eventos.filter((e) => e.capitulos.includes(capitulo.slug));
  const proximos = propios.filter((e) => e.proximo).sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
  const pasados = propios.filter((e) => !e.proximo).sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
  const susProyectos = proyectos.filter((p) => p.capitulo === capitulo.slug);
  const afinidad = capitulo.tipo === "afinidad";

  return (
    <>
      {/* Cabecera */}
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-ieee-cyan/20 blur-3xl dark:bg-ieee-blue/30" />
        <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-10">
          <Link href="/capitulos" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Todos los capítulos
          </Link>
          <div className="animate-in fade-in slide-in-from-bottom-3 mt-8 grid items-center gap-8 duration-700 md:grid-cols-[auto_1fr]">
            <div className="mx-auto grid size-40 place-items-center rounded-[2rem] border bg-card p-5 shadow-xl shadow-brand/10">
              <SocietyLogo claro={capitulo.logoClaro} oscuro={capitulo.logoOscuro} alt={capitulo.sigla} className="size-full" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold md:justify-start">
                <span className={afinidad ? "rounded-full bg-ud-gold/15 px-3 py-1 text-amber-700 dark:text-ud-gold" : "rounded-full bg-brand-soft px-3 py-1 text-brand"}>
                  {afinidad ? "Grupo de afinidad" : "Capítulo técnico"}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">{AREA_LABELS[capitulo.area]}</span>
              </div>
              <h1 className="text-3xl font-extrabold md:text-5xl">{capitulo.nombre}</h1>
              {capitulo.proposito && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{capitulo.proposito}</p>}
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button render={<Link href="/unete#voluntariado" />} className="h-11 rounded-full px-6 font-semibold">
                  Quiero unirme <ArrowRight />
                </Button>
                {capitulo.redSocial && (
                  <Button render={<a href={capitulo.redSocial} target="_blank" rel="noopener noreferrer" />} variant="outline" className="h-11 rounded-full px-5 font-semibold">
                    Redes <ExternalLink />
                  </Button>
                )}
                {capitulo.correo && (
                  <Button render={<a href={`mailto:${capitulo.correo}`} />} variant="outline" className="h-11 rounded-full px-5 font-semibold">
                    <Mail /> {capitulo.correo}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
        {/* Pilares + directiva */}
        <div className="grid gap-5 md:grid-cols-2">
          {capitulo.pilares.length > 0 && (
            <Reveal>
              <SpotlightCard className="h-full space-y-4 p-7">
                <h2 className="flex items-center gap-2 text-lg font-bold"><Target className="size-5 text-brand" /> Áreas clave</h2>
                <div className="flex flex-wrap gap-2">
                  {capitulo.pilares.map((p) => <span key={p} className="rounded-full border bg-muted/50 px-3.5 py-1.5 text-sm font-medium">{p}</span>)}
                </div>
              </SpotlightCard>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <SpotlightCard className="h-full space-y-4 p-7">
              <h2 className="text-lg font-bold">Mesa directiva</h2>
              {capitulo.directiva.length > 0 ? (
                <ul className="grid gap-3">
                  {capitulo.directiva.map((m) => (
                    <li key={m.nombre + m.cargo} className="flex items-center gap-3">
                      <div className="size-11 shrink-0 text-[0.45rem]"><Avatar name={m.nombre} src={m.foto} /></div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{m.nombre}</p>
                        <p className="text-sm text-muted-foreground">{m.cargo}</p>
                      </div>
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${m.nombre}`} className="text-muted-foreground hover:text-brand"><ExternalLink className="size-4" /></a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Directiva por anunciar. ¿Te interesa liderar este capítulo? <Link href="/unete#voluntariado" className="font-semibold text-brand hover:underline">Escríbenos</Link>.</p>
              )}
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Próximos eventos */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Próximos eventos de {capitulo.sigla}</h2>
          <UpcomingList events={proximos} instagram={capitulo.redSocial || sitio.instagram} />
        </section>

        {/* Proyectos */}
        {susProyectos.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold">Proyectos</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {susProyectos.map((p) => {
                const Icon = ICONOS[p.icono] ?? Cpu;
                return (
                  <SpotlightCard key={p.slug} className="flex h-full flex-col gap-3 p-7">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon className="size-5" /></span>
                    <h3 className="text-lg font-bold leading-snug">{p.titulo}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{p.descripcion}</p>
                    {p.enlace && (
                      <a href={p.enlace} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                        {p.enlaceTexto || "Ver más"} <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </SpotlightCard>
                );
              })}
            </div>
          </section>
        )}

        {/* Memorias */}
        {pasados.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold">Lo que hemos hecho</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pasados.slice(0, 6).map((e) => <EventCard key={e.slug} event={e} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
