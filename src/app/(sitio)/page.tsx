import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, BookOpen, Calendar, CalendarDays, HandHeart, MapPin, Microchip, Quote, Sparkles, Trophy, UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { SocietyLogo } from "@/components/ui/society-logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UpcomingList } from "@/components/eventos/upcoming-list";
import { ALIADO_LABELS, AREA_LABELS } from "@/lib/labels";
import { getAliados, getCapitulos, getEvento, getHistorias, getMemorias, getProximosEventos, getSitio } from "@/lib/content";

// Se regenera cada 12 h para que los eventos pasen solos de "próximos" a "memorias".
export const revalidate = 43200;

export default async function Home() {
  const [sitio, capitulos, proximos, memorias, historias, aliados] = await Promise.all([
    getSitio(), getCapitulos(), getProximosEventos(), getMemorias(), getHistorias(), getAliados(),
  ]);
  const destacado = sitio.eventoDestacado ? await getEvento(sitio.eventoDestacado) : null;
  const fotos = sitio.heroFotos.filter(Boolean) as string[];
  const areas = Array.from(new Set(capitulos.map((c) => c.area)));

  return (
    <div className="flex flex-col">
      {/* ───────────── Hero ───────────── */}
      <section className="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
        <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-ieee-cyan/25 blur-3xl md:animate-blob dark:bg-ieee-cyan/15" />
          <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-ieee-blue/20 blur-3xl md:animate-blob dark:bg-ieee-blue/35" style={{ animationDelay: "-8s" }} />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-7 text-center duration-700 lg:text-left">
            <Eyebrow className="bg-background/70 backdrop-blur">
              <span className="animate-pulse-dot size-2 rounded-full bg-brand" />
              Rama Estudiantil IEEE · Universidad Distrital
            </Eyebrow>
            <h1 className="text-5xl font-extrabold leading-[1.04] tracking-tighter md:text-6xl xl:text-7xl">
              Aprende haciendo.
              <br />
              <span className="font-light text-muted-foreground">Vive la experiencia </span>
              <span className="text-gradient">IEEE</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Somos la comunidad de estudiantes de la Universidad Distrital que construye, investiga y comparte
              tecnología. Talleres, hackathons, visitas técnicas y proyectos reales, abiertos a todas las carreras.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button render={<Link href="/eventos" />} className="group h-13 rounded-full px-7 text-base font-semibold shadow-lg shadow-brand/25">
                <CalendarDays className="size-5" /> Ver próximos eventos
              </Button>
              <Button render={<Link href="/unete" />} variant="outline" className="group h-13 rounded-full bg-background/60 px-7 text-base font-semibold backdrop-blur">
                Quiero participar <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            {sitio.estadisticas.length > 0 && (
              <dl className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-2 lg:justify-start">
                {sitio.estadisticas.map((s) => (
                  <div key={s.etiqueta}>
                    <dt className="sr-only">{s.etiqueta}</dt>
                    <dd className="text-2xl font-extrabold text-foreground">{s.valor}</dd>
                    <dd className="text-xs text-muted-foreground">{s.etiqueta}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Collage de fotos reales */}
          {fotos.length > 0 && (
            <div className="animate-in fade-in zoom-in-95 fill-mode-both relative mx-auto grid aspect-[5/4] w-full max-w-xl grid-cols-6 grid-rows-6 gap-3 delay-150 duration-700">
              <Photo src={fotos[0]} className="col-span-4 row-span-6" priority />
              {fotos[1] && <Photo src={fotos[1]} className="col-span-2 row-span-3" />}
              {fotos[2] && <Photo src={fotos[2]} className="col-span-2 row-span-3" />}
              {sitio.reconocimientos[0] && (
                <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border bg-card/95 px-4 py-3 shadow-xl backdrop-blur md:-left-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-ud-gold/15 text-ud-gold"><Trophy className="size-5" /></span>
                  <div className="text-sm leading-tight">
                    <p className="font-bold">{sitio.reconocimientos[0].titulo}</p>
                    <p className="text-muted-foreground">{sitio.reconocimientos[0].detalle}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ───────────── Próximos eventos ───────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Agenda" title="Próximos eventos" description="Lo que viene en la Rama y sus capítulos. Inscríbete y llega con tus amigos." />
          <Link href="/eventos" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
            Ver agenda completa <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Reveal>
          <UpcomingList events={proximos.slice(0, 3)} instagram={sitio.instagram} />
        </Reveal>
      </section>

      {/* ───────────── Sobre nosotros ───────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal className="space-y-6">
            <Eyebrow>Sobre nosotros</Eyebrow>
            <h2 className="text-3xl font-extrabold md:text-5xl">Potenciando el talento tecnológico y científico</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              La Rama Estudiantil IEEE de la Universidad Distrital es una comunidad académica dedicada a fomentar la
              innovación, el desarrollo profesional y la divulgación científica en las ingenierías y las tecnologías avanzadas.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A través de nuestros capítulos técnicos y grupos de afinidad organizamos eventos, talleres prácticos,
              conferencias con expertos internacionales y proyectos con impacto social en Colombia y la región.
            </p>
            <a href="https://es.wikipedia.org/wiki/Rama_Estudiantil_IEEE_Universidad_Distrital" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
              Conoce nuestra historia <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border shadow-2xl shadow-brand/10">
              <Image src="/images/eventos/microjam-group.jpg" alt="Participantes de la MicroJam Competition, primera edición" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 space-y-1.5 text-white">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">Hackathon de hardware</span>
                <p className="text-lg font-bold leading-tight">MicroJam Competition – Primera edición</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Qué hacemos (Bento) ───────────── */}
      <section className="border-y bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl space-y-12 px-4">
          <Reveal>
            <SectionHeading eyebrow="Unidades operativas" title="¿Qué hacemos en IEEE UD?" description="Nos organizamos en capítulos, proyectos y grupos de afinidad para que encuentres tu lugar en la tecnología." />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-6">
            <Reveal className="md:col-span-4 md:row-span-2">
              <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-8">
                <div className="space-y-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><Microchip className="size-6" /></span>
                  <h3 className="text-2xl font-bold">Capítulos técnicos</h3>
                  <p className="max-w-md text-muted-foreground">
                    Grupos especializados con sus propios talleres, proyectos y retos. Elige por área y súmate al que más te mueva.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <span key={a} className="rounded-full border bg-background px-3 py-1 text-sm">{AREA_LABELS[a]}</span>
                  ))}
                </div>
                <Link href="/capitulos" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
                  Explorar los {capitulos.length} capítulos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-2">
              <SpotlightCard className="flex h-full flex-col justify-between gap-2 p-7">
                <span className="text-5xl font-extrabold tracking-tighter text-brand">{capitulos.length}</span>
                <p className="font-medium text-muted-foreground">Capítulos y grupos de afinidad en este portal</p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-2">
              <SpotlightCard className="flex h-full flex-col justify-between gap-2 p-7">
                <span className="text-5xl font-extrabold tracking-tighter text-brand">{memorias.length}</span>
                <p className="font-medium text-muted-foreground">Eventos documentados en nuestras memorias</p>
              </SpotlightCard>
            </Reveal>
            <Reveal className="md:col-span-3">
              <SpotlightCard className="flex h-full flex-col gap-4 p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><BookOpen className="size-6" /></span>
                <h3 className="text-xl font-bold">Investigación y desarrollo</h3>
                <p className="flex-1 text-muted-foreground">Proyectos aplicados, artículos científicos y participación en competencias internacionales.</p>
                <Link href="/investigacion" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
                  Explorar proyectos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-3">
              <SpotlightCard className="flex h-full flex-col gap-4 p-8 hover:border-wie/40">
                <span className="grid size-12 place-items-center rounded-2xl bg-wie/10 text-wie dark:text-purple-300"><Sparkles className="size-6" /></span>
                <h3 className="text-xl font-bold">Mujeres en Ingeniería (WIE)</h3>
                <p className="flex-1 text-muted-foreground">Iniciativas para promover la inclusión, el liderazgo femenino y la participación de la mujer en STEM.</p>
                <Link href="/wie" className="group inline-flex items-center gap-1.5 font-semibold text-wie dark:text-purple-300">
                  Conocer WIE <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Evento destacado ───────────── */}
      {destacado && (
        <section className="mx-auto w-full max-w-6xl px-4 py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ieee-blue text-white shadow-2xl shadow-ieee-blue/30">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-ieee-cyan/40 blur-3xl md:animate-blob" />
              <div className="relative grid items-stretch md:grid-cols-2">
                <div className="space-y-6 p-8 md:p-14">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="size-3.5" /> {destacado.proximo ? "Próximo evento destacado" : "Evento destacado"}
                  </span>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">{destacado.titulo}</h2>
                  {destacado.resumen && <p className="text-lg leading-relaxed text-white/85">{destacado.resumen}</p>}
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5"><Calendar className="size-4" /> {destacado.fechaTexto}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5"><MapPin className="size-4" /> <span className="line-clamp-1">{destacado.lugar}</span></span>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {destacado.proximo && destacado.registro && (
                      <Button render={<a href={destacado.registro} target="_blank" rel="noopener noreferrer" />} className="h-11 rounded-full bg-white px-6 font-bold text-ieee-blue hover:bg-white/90">
                        Inscribirme
                      </Button>
                    )}
                    <Button
                      render={<Link href={`/eventos/${destacado.slug}`} />}
                      className={destacado.proximo && destacado.registro
                        ? "h-11 rounded-full border border-white/40 bg-transparent px-6 font-bold text-white hover:bg-white/15"
                        : "h-11 rounded-full bg-white px-6 font-bold text-ieee-blue hover:bg-white/90"}
                    >
                      {destacado.proximo ? "Ver detalles" : "Ver memoria"} <ArrowRight />
                    </Button>
                    {destacado.proximo && destacado.calendario && (
                      <Button render={<a href={destacado.calendario} />} variant="ghost" className="h-11 rounded-full px-4 font-bold text-white hover:bg-white/15 hover:text-white">
                        Añadir al calendario
                      </Button>
                    )}
                  </div>
                </div>
                {destacado.imagen && (
                  <div className="relative min-h-64 md:min-h-full">
                    <Image src={destacado.imagen} alt={destacado.titulo} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ieee-blue/60 to-transparent md:bg-gradient-to-r" />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ───────────── Historias ───────────── */}
      {historias.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Historias" title="Contado por quienes lo viven" />
            <Link href="/historias" className="group inline-flex items-center gap-1.5 font-semibold text-brand">
              Todas las historias <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {historias.slice(0, 3).map((h, i) => (
              <Reveal key={h.slug} delay={i * 0.06} className={i === 0 ? "md:col-span-2" : undefined}>
                <Link href={`/historias/${h.slug}`} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between">
                      <Quote className="size-8 text-brand/40" />
                      {!h.publicado && <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">Borrador</span>}
                    </div>
                    <h3 className={i === 0 ? "text-2xl font-bold leading-snug md:text-3xl" : "text-xl font-bold leading-snug"}>{h.titulo}</h3>
                    {h.resumen && <p className="flex-1 text-muted-foreground">{h.resumen}</p>}
                    <p className="text-sm font-semibold">{h.autor}<span className="font-normal text-muted-foreground"> · {h.rolAutor}</span></p>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── Sociedades (marquee) ───────────── */}
      <section className="border-t py-20">
        <Reveal>
          <SectionHeading title="Nuestras sociedades activas" />
        </Reveal>
        <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max gap-5 group-hover:[animation-play-state:paused] motion-safe:animate-marquee">
            {[...capitulos, ...capitulos].map((c, i) => (
              <Link
                key={`${c.slug}-${i}`}
                href={`/capitulos/${c.slug}`}
                aria-hidden={i >= capitulos.length}
                tabIndex={i >= capitulos.length ? -1 : undefined}
                className="grid h-28 w-44 shrink-0 place-items-center rounded-3xl border bg-card px-6 grayscale transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:grayscale-0"
              >
                <SocietyLogo claro={c.logoClaro} oscuro={c.logoOscuro} alt={c.sigla} className="h-16 w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Aliados ───────────── */}
      {aliados.length > 0 && (
        <section className="border-t bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl space-y-10 px-4">
            <Reveal>
              <SectionHeading eyebrow="Aliados" title="Construimos con la industria y la academia" />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {aliados.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.04}>
                  <div className="flex h-full flex-col items-center justify-center gap-2 rounded-3xl border bg-card p-6 text-center">
                    {a.logo ? (
                      <div className="relative h-12 w-full"><Image src={a.logo} alt={a.nombre} fill sizes="200px" className="object-contain dark:brightness-0 dark:invert" /></div>
                    ) : (
                      <span className="text-lg font-bold">{a.nombre}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{ALIADO_LABELS[a.tipo]}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              ¿Tu organización quiere apoyar el talento estudiantil?{" "}
              <Link href="/aliados" className="font-semibold text-brand hover:underline">Trabajemos juntos</Link>
            </p>
          </div>
        </section>
      )}

      {/* ───────────── Reconocimientos ───────────── */}
      {sitio.reconocimientos.length > 0 && (
        <section className="border-t py-24">
          <div className="mx-auto max-w-6xl space-y-12 px-4">
            <Reveal>
              <SectionHeading eyebrow="Trayectoria" title="Reconocimientos internacionales" />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {sitio.reconocimientos.map((r, i) => (
                <Reveal key={r.titulo} delay={i * 0.06}>
                  <SpotlightCard className="flex h-full flex-col items-center gap-3 p-6 text-center">
                    <span className={`grid size-14 place-items-center rounded-2xl ${["bg-ud-gold/12 text-ud-gold", "bg-slate-500/12 text-slate-500 dark:text-slate-300", "bg-ieee-blue/12 text-ieee-blue dark:text-ieee-cyan", "bg-ieee-cyan/12 text-ieee-cyan"][i % 4]}`}>
                      <Trophy className="size-7" />
                    </span>
                    <p className="font-bold">{r.titulo}</p>
                    <p className="text-sm text-muted-foreground">{r.detalle}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Dos caminos + FAQ ───────────── */}
      <section className="border-t bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl space-y-16 px-4">
          <Reveal>
            <SectionHeading eyebrow="Súmate" title="Dos formas de ser parte" description="Empieza gratis y, cuando quieras más, da el salto a la membresía IEEE." />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <SpotlightCard className="flex h-full flex-col gap-5 p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"><HandHeart className="size-6" /></span>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Gratis</p>
                  <h3 className="text-2xl font-bold">Participa y sé voluntario</h3>
                  <p className="text-muted-foreground">Asiste a eventos abiertos, ayuda a organizarlos y únete a los proyectos de un capítulo. No necesitas ser miembro IEEE.</p>
                </div>
                <Button render={<Link href="/unete#voluntariado" />} variant="outline" className="mt-auto h-12 rounded-full text-base font-semibold">
                  Quiero ser voluntario <ArrowRight />
                </Button>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.06}>
              <SpotlightCard className="flex h-full flex-col gap-5 border-brand/30 p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><UserPlus className="size-6" /></span>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-brand">Membresía anual</p>
                  <h3 className="text-2xl font-bold">Hazte miembro IEEE</h3>
                  <p className="text-muted-foreground">Accede a IEEE Xplore, descuentos en congresos, becas, concursos y a la red profesional técnica más grande del mundo.</p>
                </div>
                <Button render={<Link href="/unete#membresia" />} className="mt-auto h-12 rounded-full text-base font-semibold">
                  Cómo hacerme miembro <ArrowRight />
                </Button>
              </SpotlightCard>
            </Reveal>
          </div>

          {sitio.faq.length > 0 && (
            <Reveal className="mx-auto max-w-3xl space-y-6">
              <h3 className="text-center text-2xl font-extrabold">Preguntas frecuentes</h3>
              <Accordion className="rounded-3xl border bg-card px-6">
                {sitio.faq.map((f) => (
                  <AccordionItem key={f.pregunta} value={f.pregunta}>
                    <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">{f.pregunta}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.respuesta}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

function Photo({ src, className, priority }: { src: string; className?: string; priority?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border bg-muted shadow-xl ${className ?? ""}`}>
      <Image src={src} alt="" fill priority={priority} sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
}
