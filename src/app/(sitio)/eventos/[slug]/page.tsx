import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft, BookOpen, Building2, Calendar, CalendarPlus, Camera, CheckCircle2, Clock, ExternalLink, Layers, MapPin, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocietyLogo } from "@/components/ui/society-logo";
import { EVENT_TYPE_LABELS } from "@/lib/labels";
import { getCapitulos, getEvento, getEventos } from "@/lib/content";

export const revalidate = 43200;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getEventos()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvento((await params).slug);
  if (!event) return {};
  return {
    title: event.titulo,
    description: event.resumen,
    openGraph: event.imagen ? { images: [event.imagen] } : undefined,
  };
}

function Block({ icon: Icon, title, children, highlight = false }: { icon: LucideIcon; title: string; children: string; highlight?: boolean }) {
  return (
    <section className={highlight ? "space-y-3 rounded-3xl border border-brand/25 bg-brand-soft/60 p-6 md:p-8" : "space-y-3 rounded-3xl border bg-card p-6 md:p-8"}>
      <h2 className="flex items-center gap-3 text-lg font-bold">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Icon className="size-[18px]" /></span>
        {title}
      </h2>
      <p className="whitespace-pre-line leading-relaxed text-foreground/85">{children}</p>
    </section>
  );
}

export default async function EventoPage({ params }: Props) {
  const event = await getEvento((await params).slug);
  if (!event) notFound();
  const capitulos = (await getCapitulos()).filter((c) => event.capitulos.includes(c.slug));

  const facts = [
    { icon: Calendar, label: "Fecha", value: event.fechaTexto },
    event.horario ? { icon: Clock, label: "Horario", value: event.horario } : null,
    { icon: MapPin, label: "Lugar", value: event.lugar },
  ].filter(Boolean) as { icon: LucideIcon; label: string; value: string }[];
  const galeria = event.galeria.filter(Boolean) as string[];

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 right-0 h-80 w-[32rem] rounded-full bg-ieee-cyan/20 blur-3xl md:animate-blob dark:bg-ieee-blue/30" />
        <div className="relative mx-auto max-w-5xl space-y-6 px-4 pb-12 pt-10 md:pb-16">
          <Link href={event.proximo ? "/eventos" : "/memorias"} className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {event.proximo ? "Volver a la agenda" : "Volver a Memorias"}
          </Link>
          <div className="animate-in fade-in slide-in-from-bottom-3 space-y-5 duration-700">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-brand">{EVENT_TYPE_LABELS[event.tipo]}</span>
              {event.proximo ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ud-gold/15 px-3 py-1 text-amber-700 dark:text-ud-gold">
                  <span className="animate-pulse-dot size-1.5 rounded-full bg-ud-gold" /> Próximamente
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" /> Evento realizado
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{event.titulo}</h1>
            <div className="flex flex-wrap gap-2 text-sm">
              {facts.map((f) => (
                <span key={f.label} className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 backdrop-blur">
                  <f.icon className="size-4 text-brand" /> {f.value}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {event.proximo && event.registro && (
                <Button render={<a href={event.registro} target="_blank" rel="noopener noreferrer" />} className="h-11 rounded-full px-6 font-semibold shadow-lg shadow-brand/25">
                  Inscribirme
                </Button>
              )}
              {event.proximo && event.calendario && (
                <Button render={<a href={event.calendario} />} variant="outline" className="h-11 rounded-full px-5 font-semibold">
                  <CalendarPlus /> Añadir al calendario
                </Button>
              )}
              {event.mapa && (
                <Button render={<a href={event.mapa} target="_blank" rel="noopener noreferrer" />} variant="outline" className="h-11 rounded-full px-5 font-semibold">
                  <MapPin /> Cómo llegar
                </Button>
              )}
              {event.vtools && (
                <Button render={<a href={event.vtools} target="_blank" rel="noopener noreferrer" />} variant="ghost" className="h-11 rounded-full px-5 font-semibold">
                  Ver en IEEE vTools <ExternalLink />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-5xl space-y-12 px-4">
        {event.imagen && (
          <figure className="overflow-hidden rounded-[2rem] border bg-card shadow-2xl shadow-brand/10">
            <div className="relative aspect-[16/10] w-full md:aspect-[21/10]">
              <Image src={event.imagen} alt={event.titulo} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </figure>
        )}

        {galeria.length > 1 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold"><Camera className="size-5 text-brand" /> Galería</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {galeria.map((img, i) => (
                <div key={img} className="group relative aspect-video overflow-hidden rounded-3xl border">
                  <Image src={img} alt={`${event.titulo} — foto ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {event.descripcion && <Block icon={BookOpen} title={event.proximo ? "Sobre el evento" : "Resumen del evento"}>{event.descripcion}</Block>}
            {event.ejes && <Block icon={Layers} title="Ejes y actividades">{event.ejes}</Block>}
            {event.impacto && <Block icon={Sparkles} title="Impacto y resultados">{event.impacto}</Block>}
            {event.conclusion && <Block icon={CheckCircle2} title="Conclusión" highlight>{event.conclusion}</Block>}
            {!event.descripcion && !event.ejes && event.resumen && <Block icon={BookOpen} title="Sobre el evento">{event.resumen}</Block>}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4 rounded-3xl border bg-card p-6">
              <h3 className="font-bold">Ficha técnica</h3>
              <dl className="space-y-3 text-sm">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {capitulos.length > 0 && (
              <div className="space-y-3 rounded-3xl border bg-card p-6">
                <h3 className="font-bold">Capítulos organizadores</h3>
                <div className="flex flex-wrap gap-2">
                  {capitulos.map((c) => (
                    <Link key={c.slug} href={`/capitulos/${c.slug}`} title={c.nombre} className="grid h-14 w-20 place-items-center rounded-2xl border bg-background p-2 transition-all hover:-translate-y-0.5 hover:border-brand/40">
                      <SocietyLogo claro={c.logoClaro} oscuro={c.logoOscuro} alt={c.sigla} className="size-full" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {event.organizadores.length > 0 && (
              <details className="group rounded-3xl border bg-card p-6">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-bold">
                  <Building2 className="size-4 text-brand" /> Unidades IEEE ({event.organizadores.length})
                  <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">Ver</span>
                </summary>
                <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
                  {event.organizadores.map((host) => (
                    <li key={host} className="flex items-start gap-2 rounded-xl bg-muted/60 p-2.5 text-xs leading-tight">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      {host}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {event.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {event.etiquetas.map((tag) => (
                  <span key={tag} className="rounded-full border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">#{tag}</span>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
