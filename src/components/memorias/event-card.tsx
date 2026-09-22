"use client";
import { EventItem } from "@/types/events";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function EventCard({ event }: { event: EventItem }) {
  const getBadgeText = (type: string) => {
    switch (type) {
      case "SUMMIT": return "Cumbre Internacional";
      case "CONFERENCE": return "Conferencia";
      case "WORKSHOP": return "Taller / Bootcamp";
      case "HACKATHON": return "Hackathon";
      case "VISIT": return "Visita Técnica";
      case "MEETING": return "Encuentro Nacional";
      default: return "Evento";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="h-full flex"
    >
      <Card className="h-full flex flex-col w-full overflow-hidden border-border/60 hover:border-ieee-blue/60 transition-all duration-300 shadow-sm hover:shadow-xl bg-card">
        {event.imageUrl && (
          <div className="relative w-full h-52 overflow-hidden bg-muted group">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              <Badge className="bg-ieee-blue text-white shadow">
                {getBadgeText(event.type)}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center gap-2">
              <span className="bg-black/50 backdrop-blur px-2.5 py-1 rounded-md border border-white/10">
                {event.date} {event.time ? `• ${event.time}` : ""}
              </span>
            </div>
          </div>
        )}

        <CardHeader className={event.imageUrl ? "pt-4" : ""}>
          {!event.imageUrl && (
            <div className="flex justify-between items-start mb-2">
              <Badge variant="default" className="bg-ieee-blue text-white">
                {getBadgeText(event.type)}
              </Badge>
            </div>
          )}
          <CardTitle className="line-clamp-2 text-xl font-bold hover:text-ieee-blue transition-colors">
            {event.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <div className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-ieee-blue shrink-0" />
              <span>{event.date} {event.time ? `(${event.time})` : ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-ieee-blue shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
            {event.description}
          </p>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {event.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono"
                >
                  #{tag}
                </span>
              ))}
              {event.tags.length > 4 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded text-muted-foreground">
                  +{event.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2 border-t border-border/40 gap-2">
          <Link
            href={`/memorias/evento/${event.id}`}
            className={buttonVariants({
              variant: "default",
              className: "flex-1 bg-ieee-blue hover:bg-ieee-blue/90 text-white shadow-sm flex items-center justify-center gap-1.5"
            })}
          >
            <span>Ver Memorias</span>
            <ArrowRight size={14} />
          </Link>

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver en IEEE vTools"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "shrink-0"
              })}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

