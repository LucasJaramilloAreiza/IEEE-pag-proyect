import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, HandHeart, AtSign, Mail, MessageCircle, UserPlus, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { getSitio } from "@/lib/content";
import { IEEE_JOIN_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Únete",
  description: "Participa gratis como voluntario o hazte miembro IEEE en la Rama Estudiantil de la Universidad Distrital.",
};

const BENEFICIOS = [
  { icon: Zap, title: "Acceso técnico", text: "Biblioteca digital IEEE Xplore, descuentos en conferencias e IEEE Spectrum." },
  { icon: Users, title: "Networking global", text: "Conexión con profesionales, investigadores y ramas estudiantiles en más de 160 países." },
  { icon: BookOpen, title: "Capítulos técnicos", text: "Suma sociedades técnicas a tu membresía y participa en sus actividades." },
];

const PASOS = [
  { title: "Crea tu cuenta IEEE", text: "Regístrate en ieee.org con tu correo." },
  { title: "Elige membresía estudiantil", text: "Selecciona la Rama de la Universidad Distrital (STB04331)." },
  { title: "Súmate a un capítulo", text: "Añade las sociedades que te interesen y participa." },
];

export default async function UnetePage() {
  const sitio = await getSitio();
  const contactos = [
    sitio.formularioVoluntarios && { href: sitio.formularioVoluntarios, label: "Llenar formulario de voluntarios", icon: HandHeart, primary: true },
    sitio.whatsapp && { href: sitio.whatsapp, label: "Escribir por WhatsApp", icon: MessageCircle },
    sitio.instagram && { href: sitio.instagram, label: "Escribir por Instagram", icon: AtSign },
    sitio.correo && { href: `mailto:${sitio.correo}`, label: sitio.correo, icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail; primary?: boolean }[];

  return (
    <>
      <PageHero
        eyebrow="Súmate"
        title={<>Hay un lugar para ti en <span className="text-gradient">IEEE UD</span></>}
        description="Puedes empezar gratis participando en eventos y como voluntario. Cuando quieras más, da el salto a la membresía IEEE."
      >
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button render={<a href="#voluntariado" />} variant="outline" className="h-11 rounded-full px-5 font-semibold"><HandHeart /> Participar gratis</Button>
          <Button render={<a href="#membresia" />} className="h-11 rounded-full px-5 font-semibold"><UserPlus /> Hacerme miembro</Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-5xl space-y-24 px-4 py-16">
        {/* Camino 1: voluntariado */}
        <section id="voluntariado" className="scroll-mt-24 space-y-8">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Camino 1 · Gratis</p>
            <h2 className="text-3xl font-extrabold">Participa y sé voluntario</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              No necesitas ser miembro IEEE. Ven a los eventos abiertos, ayuda a organizarlos o súmate a los proyectos de un capítulo:
              siempre buscamos manos para logística, diseño, comunicaciones y desarrollo técnico.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <SpotlightCard className="flex h-full flex-col gap-4 p-7">
                <h3 className="text-lg font-bold">Habla con nosotros</h3>
                {contactos.length > 0 ? (
                  <div className="grid gap-2">
                    {contactos.map((c) => (
                      <Button
                        key={c.href}
                        render={<a href={c.href} target={c.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" />}
                        variant={c.primary ? "default" : "outline"}
                        className="h-12 justify-start rounded-2xl px-4 font-semibold"
                      >
                        <c.icon /> {c.label}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Pronto habilitaremos un canal de contacto.</p>
                )}
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.05}>
              <SpotlightCard className="flex h-full flex-col gap-4 p-7">
                <h3 className="text-lg font-bold">O empieza por aquí</h3>
                <ul className="grid gap-3 text-muted-foreground">
                  <li><Link href="/eventos" className="group inline-flex items-center gap-1.5 font-semibold text-brand">Ver próximos eventos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link><br />Llega a uno y conoce a la comunidad.</li>
                  <li><Link href="/capitulos" className="group inline-flex items-center gap-1.5 font-semibold text-brand">Elegir un capítulo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link><br />Cada uno tiene su propio equipo y proyectos.</li>
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* Camino 2: membresía */}
        <section id="membresia" className="scroll-mt-24 space-y-10">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold text-brand">Camino 2 · Membresía anual</p>
            <h2 className="text-3xl font-extrabold">Hazte miembro IEEE</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Sé parte de la organización profesional técnica más grande del mundo. La cuota anual la define IEEE; consulta el valor vigente en su sitio.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <SpotlightCard className="h-full space-y-3 p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><b.icon className="size-6" /></span>
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <ol className="relative grid gap-6 md:grid-cols-3">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
              {PASOS.map((s, i) => (
                <li key={s.title} className="relative flex flex-col items-center gap-3 text-center">
                  <span className="relative grid size-12 place-items-center rounded-full border-4 border-background bg-brand text-lg font-extrabold text-primary-foreground shadow-lg shadow-brand/30">{i + 1}</span>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="max-w-[16rem] text-sm text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ieee-blue p-10 text-center text-white shadow-2xl shadow-ieee-blue/30">
              <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-ieee-cyan/50 blur-3xl md:animate-blob" />
              <div className="relative space-y-5">
                <h3 className="text-3xl font-extrabold">¿Listo para unirte?</h3>
                <p className="mx-auto max-w-xl text-white/85">Regístrate en la plataforma oficial del IEEE. Toma pocos minutos.</p>
                <Button render={<a href={IEEE_JOIN_URL} target="_blank" rel="noopener noreferrer" />} className="h-12 rounded-full bg-white px-7 text-base font-bold text-ieee-blue hover:bg-white/90">
                  Ir al formulario oficial <ExternalLink />
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
