import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Link as LinkIcon, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";
import { getEquipo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Equipo",
  description: "Mesa directiva de la Rama Estudiantil IEEE Universidad Distrital.",
};

export default async function EquipoPage() {
  const equipo = await getEquipo();

  return (
    <>
      <PageHero
        eyebrow="Rama STB04331"
        title="Mesa directiva de la Rama"
        description="Conoce a los líderes y voluntarios que hacen posible el funcionamiento de la Rama Estudiantil IEEE UD."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.05}>
              <SpotlightCard className="group flex h-full flex-col items-center p-8 text-center">
                <div className="mb-5 size-32 rounded-full bg-gradient-to-br from-ieee-blue via-ieee-cyan to-ud-gold p-[3px] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                  <Avatar name={m.nombre} src={m.foto} className="border-4 border-card" />
                </div>
                <h2 className="text-lg font-bold">{m.nombre}</h2>
                <p className="mt-1 rounded-full bg-brand-soft px-3 py-0.5 text-sm font-semibold text-brand">{m.cargo}</p>
                {(m.linkedin || m.correo) && (
                  <div className="mt-5 flex gap-2">
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${m.nombre}`} className="grid size-10 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-brand hover:bg-brand hover:text-primary-foreground">
                        <LinkIcon className="size-4" />
                      </a>
                    )}
                    {m.correo && (
                      <a href={`mailto:${m.correo}`} aria-label={`Correo de ${m.nombre}`} className="grid size-10 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-brand hover:bg-brand hover:text-primary-foreground">
                        <Mail className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-dashed bg-card/60 p-8 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-xl font-bold">¿Quieres ser parte del equipo?</h2>
              <p className="text-muted-foreground">Cada año renovamos la directiva. Empieza como voluntario y crece con nosotros.</p>
            </div>
            <Link href="/unete#voluntariado" className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand">
              Postúlate como voluntario <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
