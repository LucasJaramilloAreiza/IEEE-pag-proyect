import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink, MapPin } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EVENT_TYPE_LABELS } from "@/lib/labels";
import type { Evento } from "@/lib/content";

/** Tarjeta de memoria (evento ya realizado). */
export function EventCard({ event }: { event: Evento }) {
  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden">
      <Link href={`/eventos/${event.slug}`} className="flex flex-1 flex-col outline-none">
        <div className="relative m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
          {event.imagen && (
            <Image
              src={event.imagen}
              alt={event.titulo}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md">
            {EVENT_TYPE_LABELS[event.tipo]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5 text-brand" />{event.fechaTexto}</span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-brand" />
              <span className="line-clamp-1">{event.lugar}</span>
            </span>
          </div>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-brand">{event.titulo}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{event.resumen}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t px-5 py-3 text-sm">
        <Link href={`/eventos/${event.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-brand">
          Ver memoria <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        {event.vtools && (
          <a href={event.vtools} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand">
            vTools <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}
