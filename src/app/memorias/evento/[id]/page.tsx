import { MOCK_EVENTS } from "@/data/mock-events";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ExternalLink, ArrowLeft, Building2, FileText, CheckCircle2, Sparkles, BookOpen, Layers, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function EventoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = MOCK_EVENTS.find(e => e.id === resolvedParams.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Top navigation */}
      <div className="bg-muted/40 border-b border-border/60 py-4">
        <div className="container max-w-5xl mx-auto px-4">
          <Link
            href="/memorias"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ieee-blue transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Volver a Memorias
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-muted/60 via-card to-background py-12 md:py-16 border-b border-border/60">
        <div className="container max-w-5xl mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-ieee-blue text-white px-3 py-1 text-xs">
              Memoria Oficial IEEE
            </Badge>
            <Badge variant="outline" className="text-xs border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
              <CheckCircle2 size={12} className="mr-1 inline" /> Evento Concluido
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-ieee-blue shrink-0" />
              <span className="font-medium text-foreground">{event.date}</span>
              {event.time && <span>• {event.time}</span>}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-ieee-blue shrink-0" />
              <span className="font-medium text-foreground">{event.location}</span>
            </div>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "default",
                  className: "bg-ieee-blue hover:bg-ieee-blue/90 text-white gap-2 shadow"
                })}
              >
                <ExternalLink size={16} />
                Ver en IEEE vTools
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 mt-10 space-y-12">
        {/* Featured Image */}
        {event.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
            <div className="relative w-full aspect-[16/10] md:aspect-[21/10]">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t text-xs text-muted-foreground flex justify-between items-center">
              <span>Fotografía del evento y actividades hands-on</span>
              <span className="font-mono text-[11px]">{event.location}</span>
            </div>
          </div>
        )}

        {/* Gallery if multiple photos */}
        {event.gallery && event.gallery.length > 1 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Camera size={20} className="text-ieee-blue" />
              <h2>Galería Fotográfica</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.gallery.map((imgUrl, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border/80 shadow-md group">
                  <Image
                    src={imgUrl}
                    alt={`${event.title} foto ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Structured Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Deep Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {event.overview && (
              <div className="p-6 md:p-8 rounded-xl border border-border/70 bg-card shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-ieee-blue font-bold text-lg">
                  <BookOpen size={20} />
                  <h2>Resumen del Evento (Event Overview)</h2>
                </div>
                <p className="text-foreground/90 leading-relaxed text-base whitespace-pre-line">
                  {event.overview}
                </p>
              </div>
            )}

            {/* Strategic Themes / Exhibition */}
            {event.themes && (
              <div className="p-6 md:p-8 rounded-xl border border-border/70 bg-card shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-ieee-blue font-bold text-lg">
                  <Layers size={20} />
                  <h2>Exhibición Interactiva y Ejes Estratégicos</h2>
                </div>
                <p className="text-foreground/90 leading-relaxed text-base whitespace-pre-line">
                  {event.themes}
                </p>
              </div>
            )}

            {/* Impact / Workshop */}
            {event.impact && (
              <div className="p-6 md:p-8 rounded-xl border border-border/70 bg-card shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-ieee-blue font-bold text-lg">
                  <Sparkles size={20} />
                  <h2>Taller Práctico, Soldadura y Concurso de Ensamble PCB</h2>
                </div>
                <p className="text-foreground/90 leading-relaxed text-base whitespace-pre-line">
                  {event.impact}
                </p>
              </div>
            )}

            {/* Conclusion */}
            {event.conclusion && (
              <div className="p-6 md:p-8 rounded-xl border border-ieee-blue/30 bg-ieee-blue/5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-ieee-blue font-bold text-lg">
                  <CheckCircle2 size={20} />
                  <h2>Conclusión y Articulación Profesional</h2>
                </div>
                <p className="text-foreground/90 leading-relaxed text-base font-medium whitespace-pre-line">
                  {event.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Metadata & Hosts */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="p-6 rounded-xl border border-border/70 bg-card shadow-sm space-y-4">
              <h3 className="font-bold text-base text-foreground border-b pb-2 flex items-center gap-2">
                <FileText size={18} className="text-ieee-blue" />
                Ficha Técnica
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">Fecha</span>
                  <span className="text-foreground font-medium">{event.date}</span>
                </div>
                {event.time && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">Horario</span>
                    <span className="text-foreground font-medium">{event.time}</span>
                  </div>
                )}
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">Ubicación</span>
                  <span className="text-foreground font-medium">{event.location}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">Registro vTools</span>
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ieee-blue hover:underline break-all inline-flex items-center gap-1 font-mono text-xs pt-1"
                    >
                      {event.link.replace('https://', '')} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-xs">No disponible</span>
                  )}
                </div>
              </div>
            </div>

            {/* Hosts / Organizational Units Card */}
            {event.hosts && event.hosts.length > 0 && (
              <div className="p-6 rounded-xl border border-border/70 bg-card shadow-sm space-y-4">
                <h3 className="font-bold text-base text-foreground border-b pb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-ieee-blue" />
                  Hosts & Capítulos Organizadores ({event.hosts.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {event.hosts.map((host, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-2 rounded-md bg-muted/60 text-foreground/90 border border-border/40 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ieee-blue mt-1.5 shrink-0" />
                      <span className="leading-tight">{host}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
