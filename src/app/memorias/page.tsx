import { MOCK_EVENTS } from "@/data/mock-events";
import { EventCard } from "@/components/memorias/event-card";
import { Award, BookOpen, CalendarCheck } from "lucide-react";

export default function MemoriasPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ieee-blue/10 text-ieee-blue text-xs font-semibold tracking-wide">
            <BookOpen size={14} />
            Histórico de Actividades y Eventos
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Memorias <span className="text-ieee-blue">IEEE UD</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Registro oficial y memorias de las cumbres, congresos, talleres y proyectos internacionales
            liderados y organizados por la Rama Estudiantil IEEE Universidad Distrital y sus capítulos técnicos.
          </p>
        </div>

        {/* Stats / Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur">
            <div className="text-2xl font-bold text-ieee-blue font-mono">{MOCK_EVENTS.length}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Memorias Registradas</div>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur">
            <div className="text-2xl font-bold text-ieee-blue font-mono">18+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Capítulos y Grupos de Afinidad</div>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur">
            <div className="text-2xl font-bold text-ieee-blue font-mono">100%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Validado con IEEE vTools</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {MOCK_EVENTS.map(evt => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
}
