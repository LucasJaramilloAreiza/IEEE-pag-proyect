import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { UpcomingList } from "@/components/eventos/upcoming-list";
import { EventCard } from "@/components/eventos/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMemorias, getProximosEventos, getSitio } from "@/lib/content";

export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de talleres, charlas, hackathons y visitas técnicas de la Rama Estudiantil IEEE UD.",
};

export default async function EventosPage() {
  const [proximos, memorias, sitio] = await Promise.all([getProximosEventos(), getMemorias(), getSitio()]);

  return (
    <>
      <PageHero
        eyebrow={<><CalendarDays className="size-3.5" /> Agenda</>}
        title={<>Próximos <span className="text-gradient">eventos</span></>}
        description="Talleres, charlas, hackathons y visitas técnicas abiertas a la comunidad. Inscríbete y no te quedes por fuera."
      />
      <div className="mx-auto max-w-5xl space-y-20 px-4 py-16">
        <UpcomingList events={proximos} instagram={sitio.instagram} />

        {memorias.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading align="left" title="Lo más reciente" description="Así se vivieron nuestros últimos eventos." />
              <Link href="/memorias" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
                Ver todas las memorias <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {memorias.slice(0, 3).map((e) => <EventCard key={e.slug} event={e} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
