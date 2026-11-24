import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Handshake, Lightbulb, Megaphone, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { ALIADO_LABELS } from "@/lib/labels";
import { getAliados, getSitio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aliados y empresas",
  description: "Organizaciones que apoyan a la Rama Estudiantil IEEE UD y cómo trabajar con nosotros.",
};

const PROPUESTA = [
  { icon: Users, title: "Talento joven", text: "Conecta con estudiantes de ingeniería motivados, que ya trabajan en proyectos reales." },
  { icon: Lightbulb, title: "Retos y talleres", text: "Co-diseña hackathons, talleres o visitas técnicas alrededor de tus tecnologías." },
  { icon: Megaphone, title: "Visibilidad", text: "Tu marca presente en eventos, memorias y canales de una comunidad IEEE reconocida en la Región 9." },
];

export default async function AliadosPage() {
  const [aliados, sitio] = await Promise.all([getAliados(), getSitio()]);
  const contacto = sitio.correo ? `mailto:${sitio.correo}?subject=Alianza%20con%20IEEE%20UD` : sitio.linkedin;

  return (
    <>
      <PageHero
        eyebrow={<><Handshake className="size-3.5" /> Aliados</>}
        title={<>Construimos con la <span className="text-gradient">industria</span> y la academia</>}
        description="Empresas, universidades e instituciones que han hecho posibles nuestros eventos y proyectos."
      />
      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16">
        {aliados.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aliados.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 4) * 0.04}>
                <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                  <div className="flex h-14 items-center">
                    {a.logo ? (
                      <div className="relative h-12 w-full"><Image src={a.logo} alt={a.nombre} fill sizes="240px" className="object-contain object-left dark:brightness-0 dark:invert" /></div>
                    ) : (
                      <span className="text-xl font-extrabold leading-tight">{a.nombre}</span>
                    )}
                  </div>
                  <span className="w-fit rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{ALIADO_LABELS[a.tipo]}</span>
                  {a.descripcion && <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{a.descripcion}</p>}
                  {a.sitio && (
                    <a href={a.sitio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                      Sitio web <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}

        <section className="space-y-10">
          <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="text-sm font-semibold text-brand">Para empresas e instituciones</p>
            <h2 className="text-3xl font-extrabold md:text-4xl">¿Por qué apoyar a IEEE UD?</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {PROPUESTA.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <SpotlightCard className="h-full space-y-3 p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><p.icon className="size-6" /></span>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          {contacto && (
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-ieee-blue p-10 text-center text-white shadow-2xl shadow-ieee-blue/30">
                <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-ieee-cyan/50 blur-3xl md:animate-blob" />
                <div className="relative space-y-5">
                  <h3 className="text-3xl font-extrabold">Trabajemos juntos</h3>
                  <p className="mx-auto max-w-xl text-white/85">Cuéntanos qué te interesa y armamos una propuesta a la medida de tu organización.</p>
                  <Button render={<a href={contacto} target={contacto.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" />} className="h-12 rounded-full bg-white px-7 text-base font-bold text-ieee-blue hover:bg-white/90">
                    <Mail /> Contactar a la Rama
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </section>
      </div>
    </>
  );
}
