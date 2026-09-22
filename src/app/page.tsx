"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Trophy, ChevronRight, BookOpen, Microchip, Zap, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-32 md:py-48 flex items-center justify-center bg-gradient-to-br from-ieee-blue/20 dark:from-ieee-blue/40 via-background to-background overflow-hidden border-b">
        <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=IEEE')] opacity-10 dark:opacity-5 mix-blend-overlay dark:mix-blend-screen"></div>
        <div className="container mx-auto px-4 text-center z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-ieee-blue dark:text-ieee-cyan drop-shadow-sm">
              Vive la Experiencia IEEE
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Rama Estudiantil IEEE Universidad Distrital Francisco José de Caldas
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8"
          >
            <Button render={<a href="https://www.ieee.org/membership/join/?WT_mc_id=hc_join" target="_blank" rel="noopener noreferrer" />} size="lg" className="h-14 px-8 text-lg bg-ieee-blue hover:bg-ieee-cyan text-white shadow-lg">
              Únete al IEEE <ChevronRight className="ml-2 h-5 w-5"/>
            </Button>
            <Button render={<Link href="/memorias" />} variant="outline" size="lg" className="h-14 px-8 text-lg backdrop-blur-sm bg-background/50">
              Próximos Eventos
            </Button>
          </motion.div>


        </div>
      </section>

      {/* About Section */}
      <section className="py-24 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan">
              Sobre Nosotros
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Potenciando el Talento Tecnológico y Científico</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              La Rama Estudiantil IEEE de la Universidad Distrital Francisco José de Caldas es una comunidad académica dedicada a fomentar la innovación, el desarrollo profesional y la divulgación científica en el ámbito de las ingenierías y las tecnologías avanzadas.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A través de nuestros capítulos técnicos y grupos de afinidad, organizamos eventos, talleres prácticos, conferencias con expertos internacionales y proyectos con impacto social y tecnológico en Colombia y la región.
            </p>
            <Button render={<a href="https://es.wikipedia.org/wiki/Rama_Estudiantil_IEEE_Universidad_Distrital" target="_blank" rel="noreferrer" />} variant="link" className="px-0 text-ieee-blue dark:text-ieee-cyan">
              Conoce más sobre nuestra historia →
            </Button>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-xl bg-muted flex items-center justify-center">
             <Image src="/images/eventos/microjam-group.jpg" alt="MicroJam Competition First Edition" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
             <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
               <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-ieee-blue/90 backdrop-blur-sm inline-block">Hardware Hackathon</span>
               <p className="font-bold text-sm md:text-base leading-tight drop-shadow">MicroJam Competition – First Edition</p>
             </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-24 bg-muted/40 border-t border-b">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestras Unidades Operativas</h2>
            <p className="text-muted-foreground">Explora cómo nos organizamos para brindar oportunidades en múltiples disciplinas tecnológicas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border bg-background space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan">
                  <Microchip className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Capítulos Técnicos</h3>
                <p className="text-sm text-muted-foreground">Grupos especializados en áreas como Circuitos y Sistemas, Electrónica de Potencia, Robótica, Computación y más.</p>
              </div>
              <Button render={<Link href="/capitulos" />} variant="outline" className="w-full">
                Ver Capítulos
              </Button>
            </div>
            <div className="p-8 rounded-2xl border bg-background space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Investigación y Desarrollo</h3>
                <p className="text-sm text-muted-foreground">Proyectos técnicos aplicados, publicación de artículos científicos y participación en competencias internacionales.</p>
              </div>
              <Button render={<Link href="/investigacion" />} variant="outline" className="w-full">
                Explorar Proyectos
              </Button>
            </div>
            <div className="p-8 rounded-2xl border bg-background space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Mujeres en Ingeniería (WIE)</h3>
                <p className="text-sm text-muted-foreground">Iniciativas para promover la inclusión, el liderazgo femenino y la participación de la mujer en áreas STEM.</p>
              </div>
              <Button render={<Link href="/wie" />} variant="outline" className="w-full">
                Conocer WIE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event: PELS Day 2026 */}
      <section className="py-24 container mx-auto px-4 max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-r from-ieee-blue via-ieee-blue/90 to-ieee-cyan text-white p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6">
               <div className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md">
                 🎉 Evento Destacado
               </div>
               <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                 IEEE PELS Day 2026 Celebration
               </h2>
               <p className="text-white/90 text-lg leading-relaxed">
                 As part of the global IEEE PELS Day 2026 celebration, Universidad de los Andes and Universidad Distrital joined forces. We took the lead on the interactive and hands-on experiences, bridging academic theory with electronics manufacturing and the industry.
               </p>
               <div className="flex flex-wrap gap-4 text-sm pt-2">
                 <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                   <Calendar className="h-4 w-4" /> 16 de Mayo, 2026
                 </div>
                 <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                   <MapPin className="h-4 w-4" /> Uniandes & UD Campus
                 </div>
               </div>
               <div className="pt-4 flex flex-wrap gap-4">
                <Button render={<a href="https://events.vtools.ieee.org/event/569110/ical" />} variant="secondary" className="bg-white text-ieee-blue hover:bg-gray-100 border-none font-bold">
                  Añadir al Calendario
                </Button>
                <Button render={<a href="https://maps.app.goo.gl/2pDQW6sMDr2DSsJJA" target="_blank" rel="noreferrer" />} variant="outline" className="border-white text-white hover:bg-white/20 font-bold">
                  Ubicación
                </Button>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 relative">
               <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=Circuit')] opacity-20 bg-cover bg-center mix-blend-luminosity"></div>
               
               <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center rounded-full border border-white/30 px-2.5 py-0.5 text-xs font-semibold bg-black/30 backdrop-blur-sm">
                    Interactive Exhibition
                  </div>
                  <h3 className="text-2xl font-bold">Siemens & Ectricol Bus ShowRoom</h3>
                  <p className="text-white/80 text-sm">Mobile industrial automation laboratory. Guided tours allowing participants to interact with control panels, variable frequency drives, and solid-state starters.</p>
               </div>

               <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center rounded-full border border-white/30 px-2.5 py-0.5 text-xs font-semibold bg-black/30 backdrop-blur-sm">
                    Workshop
                  </div>
                  <h3 className="text-2xl font-bold">Power PCB Design and Assembly</h3>
                  <p className="text-white/80 text-sm">Practical soldering and electronic manufacturing workshop. The session concluded with a &quot;PCB Assembly Contest,&quot; evaluating soldering quality, time, and circuit functionality.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Showcase */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestras Sociedades Activas</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity max-w-3xl mx-auto">
            {["AESS", "CAS", "CS", "EMBS", "GRSS", "PELS", "PES", "RAS", "WIE"].map((acronym) => (
              <div key={acronym} className="w-24 h-24 relative grayscale hover:grayscale-0 transition-all cursor-pointer">
                <Image src={`/images/logos/${acronym}_Black.png`} alt={acronym} fill className="object-contain dark:hidden" />
                <Image src={`/images/logos/${acronym}_White.png`} alt={acronym} fill className="object-contain hidden dark:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Showcase */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Reconocimientos Internacionales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-6 border rounded-2xl bg-background flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Trophy className="h-10 w-10 text-ud-gold" />
                <p className="font-bold text-sm md:text-base">Rama Ejemplar</p>
                <p className="text-xs md:text-sm text-muted-foreground">Región 9 (2019, 2016, 2013)</p>
             </div>
             <div className="p-6 border rounded-2xl bg-background flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Trophy className="h-10 w-10 text-gray-400" />
                <p className="font-bold text-sm md:text-base">Silver Darrel Chong</p>
                <p className="text-xs md:text-sm text-muted-foreground">Award 2017 & 2013</p>
             </div>
             <div className="p-6 border rounded-2xl bg-background flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Trophy className="h-10 w-10 text-ieee-blue" />
                <p className="font-bold text-sm md:text-base">Website Contest</p>
                <p className="text-xs md:text-sm text-muted-foreground">1° Lugar LATAM (2009)</p>
             </div>
             <div className="p-6 border rounded-2xl bg-background flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Trophy className="h-10 w-10 text-ieee-cyan" />
                <p className="font-bold text-sm md:text-base">Casos de Éxito</p>
                <p className="text-xs md:text-sm text-muted-foreground">Sección Colombia</p>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}


