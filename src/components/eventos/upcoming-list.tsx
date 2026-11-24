import Link from "next/link";
import { ArrowRight, CalendarPlus, Clock, AtSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EVENT_TYPE_LABELS } from "@/lib/labels";
import { dateBadge, type Evento } from "@/lib/content";

/** Lista de próximos eventos en formato agenda; si no hay, un estado vacío útil. */
export function UpcomingList({ events, instagram }: { events: Evento[]; instagram?: string | null }) {
  if (events.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed bg-card/60 p-10 text-center">
        <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-md space-y-4">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand"><CalendarPlus className="size-7" /></span>
          <h3 className="text-xl font-bold">Estamos preparando lo que viene</h3>
          <p className="text-muted-foreground">
            Aún no hay eventos anunciados. Síguenos para enterarte primero, o revisa lo que ya hicimos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            {instagram && (
              <Button render={<a href={instagram} target="_blank" rel="noopener noreferrer" />} className="h-11 rounded-full px-5 font-semibold">
                <AtSign /> Seguir en Instagram
              </Button>
            )}
            <Button render={<Link href="/memorias" />} variant="outline" className="h-11 rounded-full px-5 font-semibold">
              Ver memorias
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {events.map((e) => {
        const b = dateBadge(e.fechaInicio);
        return (
          <SpotlightCard key={e.slug} className="group flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-brand px-5 py-3 text-primary-foreground shadow-lg shadow-brand/25 sm:w-24">
              <span className="text-3xl font-extrabold leading-none">{b.dia}</span>
              <span className="text-sm font-semibold uppercase">{b.mes}</span>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">{EVENT_TYPE_LABELS[e.tipo]}</span>
              <h3 className="text-xl font-bold leading-snug">
                <Link href={`/eventos/${e.slug}`} className="transition-colors hover:text-brand">{e.titulo}</Link>
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{e.fechaTexto}</span>
                {e.horario && <span className="inline-flex items-center gap-1.5"><Clock className="size-4" />{e.horario}</span>}
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{e.lugar}</span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              {e.registro ? (
                <Button render={<a href={e.registro} target="_blank" rel="noopener noreferrer" />} className="h-11 rounded-full px-5 font-semibold">
                  Inscribirme
                </Button>
              ) : null}
              <Button render={<Link href={`/eventos/${e.slug}`} />} variant="outline" className="h-11 rounded-full px-4 font-semibold" aria-label={`Detalles de ${e.titulo}`}>
                Detalles <ArrowRight />
              </Button>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
