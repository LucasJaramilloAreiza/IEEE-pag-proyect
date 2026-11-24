import type { Metadata } from "next";
import { Award, ExternalLink, Heart, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SocietyLogo } from "@/components/ui/society-logo";
import { Reveal } from "@/components/ui/reveal";
import { IEEE_JOIN_URL } from "@/lib/utils";
import { getCapitulo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Women in Engineering",
  description: "Grupo de afinidad IEEE WIE en la Universidad Distrital dedicado a promover la inclusión, el liderazgo femenino y la participación de las mujeres en áreas STEM.",
};

const HIGHLIGHTS = [
  {
    icon: Users,
    title: "Liderazgo e inclusión",
    text: "Espacios de desarrollo profesional, mentoría y trabajo en equipo para potenciar el talento de nuestras voluntarias en roles de liderazgo.",
  },
  {
    icon: Sparkles,
    title: "Eventos y hackathons",
    text: "Co-organización de competencias como la MicroJam Competition (Hardware Hackathon), talleres técnicos y paneles de divulgación tecnológica.",
  },
  {
    icon: Award,
    title: "Red global IEEE",
    text: "Conexión con la red internacional de más de 30.000 miembros WIE, participando en cumbres de la Sección Colombia y la Región 9.",
  },
];

export default async function WIEPage() {
  const wie = await getCapitulo("wie");
  return (
    <>
      <PageHero
        tone="wie"
        eyebrow={<><Heart className="size-3.5" /> Grupo de afinidad</>}
        title={<>IEEE <span className="text-wie dark:text-purple-300">Women in Engineering</span> UD</>}
        description="Promovemos a las mujeres científicas e ingenieras e inspiramos a niñas de todo el mundo a seguir sus intereses en ciencia, tecnología, ingeniería y matemáticas."
      >
        {wie && <SocietyLogo claro={wie.logoClaro} oscuro={wie.logoOscuro} alt="IEEE WIE" className="mx-auto h-20 w-56" />}
      </PageHero>
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06}>
              <SpotlightCard className="h-full space-y-3 p-7 [--brand:var(--color-wie)] hover:border-wie/40 dark:[--brand:oklch(0.8_0.1_310)]">
                <span className="grid size-12 place-items-center rounded-2xl bg-wie/10 text-wie dark:text-purple-300"><h.icon className="size-6" /></span>
                <h3 className="text-lg font-bold">{h.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-wie via-purple-600 to-indigo-600 p-8 text-white shadow-2xl shadow-wie/30 md:flex-row md:p-12">
            <div className="animate-blob pointer-events-none absolute -bottom-24 -right-10 size-80 rounded-full bg-pink-400/30 blur-3xl" />
            <div className="relative max-w-xl space-y-2">
              <h2 className="text-2xl font-extrabold md:text-3xl">¡Haz parte de IEEE WIE UD!</h2>
              <p className="text-white/85">Abierto a todos los estudiantes apasionados por la equidad y el impacto tecnológico.</p>
            </div>
            <Button
              render={<a href={IEEE_JOIN_URL} target="_blank" rel="noopener noreferrer" />}
              className="relative h-12 shrink-0 rounded-full bg-white px-7 font-bold text-wie hover:bg-white/90"
            >
              Únete a IEEE WIE <ExternalLink />
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
