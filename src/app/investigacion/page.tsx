import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Microchip, Cpu, Zap, Bot, Shield, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Investigación y Desarrollo - IEEE Universidad Distrital",
  description: "Proyectos de investigación aplicada, publicaciones científicas y desarrollo de tecnologías avanzadas en la Rama Estudiantil IEEE UD.",
};

export default function InvestigacionPage() {
  const projects = [
    {
      title: "EPICS in IEEE - Andino Hydroresilience",
      chapter: "IEEE PELS",
      icon: Zap,
      description: (
        <span>
          Liderado por Lucas Jaramillo Areiza. Trabajo conjunto con <strong>AgroRosario</strong>, una comunidad campesina, para el desarrollo de una micropelton de generación de electricidad.{" "}
          <a href="https://www.instagram.com/reel/DbZ2eEZINxx/?stkn=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer" className="text-ieee-blue dark:text-ieee-cyan hover:underline">
            Ver video en Instagram
          </a>
        </span>
      ),
      tags: ["EPICS", "Comunidad Campesina", "Micropelton", "Energía"],
      status: "En Desarrollo",
    },
    {
      title: "Robótica Social e Inteligencia Artificial Corporizada",
      chapter: "IEEE RAS & Grupo SinfonIA",
      icon: Bot,
      description: "Desarrollo de algoritmos de navegación kinemática y visión por computador sobre plataformas humanoides avanzadas (Unitree G1, Pepper y NAO).",
      tags: ["Humanoides", "Visión Artificial", "Navegación", "IA Corporizada"],
      status: "Investigación Activa",
    },
    {
      title: "Convertidores Modularizados de Electrónica de Potencia",
      chapter: "IEEE PELS",
      icon: Zap,
      description: "Diseño, manufactura de tarjetas PCB y ensamblaje de módulos industriales para control de motores y eficiencia energética en microrredes.",
      tags: ["PCB Assembly", "Power Electronics", "Microrredes", "Siemens & Ectricol"],
      status: "Prototipo Validado",
    },
    {
      title: "Protocolos y Monitoreo Físico en Reactores Nucleares",
      chapter: "IEEE PES",
      icon: Shield,
      description: "Estudio de sistemas de redundancia, ciclos de combustible y seguridad radiológica aplicados al reactor de investigación IAN-R1 (SGC).",
      tags: ["Energía Nuclear", "Radiología", "Seguridad Físico-Química", "IAN-R1"],
      status: "Estudio Aplicado",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ieee-blue/10 text-ieee-blue text-xs font-semibold tracking-wide">
            <BookOpen size={14} />
            Unidad de Investigación y Desarrollo (I+D)
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Proyectos e Investigación <span className="text-ieee-blue dark:text-ieee-cyan">IEEE UD</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Nuestros miembros y capítulos técnicos impulsan proyectos de ingeniería aplicada,
            divulgación científica y desarrollo tecnológico de frontera con reconocimiento nacional e internacional.
          </p>
        </div>

        {/* Hero Banner / Highlight */}
        <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-ieee-blue">
            <Microchip size={240} />
          </div>
          <div className="relative z-10 space-y-4 max-w-2xl">
            <Badge className="bg-ieee-blue text-white">Impacto Científico y Tecnológico</Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Investigación Abierta y Colaborativa</h2>
            <p className="text-muted-foreground leading-relaxed">
              Fomentamos la publicación en cumbres como la IEEE Latin America & the Caribbean Semiconductor Summit (LACSS)
              y la integración directa con la industria tecnológica y de semiconductores.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button render={<Link href="/memorias" />} className="bg-ieee-blue hover:bg-ieee-cyan text-white gap-2">
                Ver Memorias de Eventos <ArrowRight size={16} />
              </Button>
              <Button render={<Link href="/capitulos" />} variant="outline">
                Ver Capítulos Técnicos
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Líneas y Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => {
              const IconComp = proj.icon;
              return (
                <Card key={idx} className="flex flex-col justify-between hover:border-ieee-cyan/50 transition-colors shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan">
                        <IconComp size={24} />
                      </div>
                      <Badge variant="secondary" className="text-xs font-mono">
                        {proj.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-ieee-blue dark:text-ieee-cyan mb-1 font-mono">
                        {proj.chapter}
                      </div>
                      <CardTitle className="text-xl leading-snug">{proj.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {proj.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((t, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}


