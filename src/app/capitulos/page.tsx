import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ChapterQuickView, Chapter } from "@/components/ui/chapter-quick-view";

export default function CapitulosPage() {
  const chapters: Chapter[] = [
    { 
      name: "Aerospace and Electronic Systems Society (AESS)", 
      status: "Activo", 
      acronym: "AESS",
      purpose: "Fomentamos la investigación y desarrollo en sistemas aeroespaciales, drones, y radares de alta tecnología para aplicaciones civiles y de defensa.",
      pillars: ["Drones & UAVs", "Sistemas de Radar", "Telemetría"],
      board: { chair: "Chair AESS Ficticio", advisor: "Advisor AESS Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "aess@ieee.udistrital.edu.co"
    },
    { 
      name: "Circuits and Systems Society (CAS)", 
      status: "Activo", 
      acronym: "CAS",
      purpose: "Nos enfocamos en el diseño, análisis y aplicación de circuitos integrados, microelectrónica y sistemas embebidos de código abierto.",
      pillars: ["Microelectrónica", "Sistemas Embebidos", "Diseño de Circuitos"],
      board: { chair: "Chair CAS Ficticio", advisor: "Advisor CAS Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "cas@ieee.udistrital.edu.co"
    },
    { 
      name: "Computer Society (CS)", 
      status: "Activo", 
      acronym: "CS",
      purpose: "Impulsamos el desarrollo de software, inteligencia artificial, arquitectura de computadoras y ciberseguridad a través de competencias y proyectos prácticos.",
      pillars: ["Inteligencia Artificial", "Ciberseguridad", "Ingeniería de Software"],
      board: { chair: "Chair CS Ficticio", advisor: "Advisor CS Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "cs@ieee.udistrital.edu.co"
    },
    { 
      name: "Engineering in Medicine and Biology Society (EMBS)", 
      status: "Activo", 
      acronym: "EMBS",
      purpose: "Aplicamos conceptos de ingeniería y tecnología a la biología y la medicina para mejorar la atención médica y el bienestar de las personas.",
      pillars: ["Biomédica", "Procesamiento de Señales", "Equipos Médicos"],
      board: { chair: "Chair EMBS Ficticio", advisor: "Advisor EMBS Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "embs@ieee.udistrital.edu.co"
    },
    { 
      name: "Geoscience and Remote Sensing Society (GRSS)", 
      status: "Activo", 
      acronym: "GRSS",
      purpose: "Analizamos datos de percepción remota y ciencias de la Tierra para monitorización medioambiental, desarrollo sostenible y análisis satelital.",
      pillars: ["Percepción Remota", "GIS", "Análisis Satelital"],
      board: { chair: "Diana Soto Romero", advisor: "Erika Upegui" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "grss@ieee.udistrital.edu.co"
    },
    { 
      name: "Power Electronics Society (PELS)", 
      status: "Activo", 
      acronym: "PELS",
      purpose: "Promovemos el desarrollo y aplicación de la electrónica de potencia, conversión de energía y control de sistemas eléctricos.",
      pillars: ["Electrónica de Potencia", "Energías Renovables", "Control de Motores"],
      board: { chair: "Lucas Jaramillo Areiza", advisor: "Oscar Florez Cediel" },
      socialLink: "https://www.instagram.com/pels.ud.ieee/",
      email: "pels@ieee.udistrital.edu.co"
    },
    { 
      name: "Power & Energy Society (PES)", 
      status: "Activo", 
      acronym: "PES",
      purpose: "Nos especializamos en el conocimiento de la energía eléctrica, desde la generación hasta la distribución, promoviendo tecnologías seguras y sostenibles.",
      pillars: ["Redes Eléctricas", "Generación", "Energía Sostenible"],
      board: { chair: "Chair PES Ficticio", advisor: "Advisor PES Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "pes@ieee.udistrital.edu.co"
    },
    { 
      name: "Robotics and Automation Society (RAS)", 
      status: "Activo", 
      acronym: "RAS",
      purpose: "Exploramos el diseño y control de sistemas robóticos autónomos, robótica social e inteligencia artificial para la automatización de procesos.",
      pillars: ["Robótica Autónoma", "Automatización", "Inteligencia Artificial"],
      board: { chair: "Helmut Chaparro Sandoval", advisor: "Vacante" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "ras@ieee.udistrital.edu.co"
    },
    { 
      name: "Women in Engineering (WIE)", 
      status: "Afinidad", 
      acronym: "WIE",
      purpose: "Empoderamos e inspiramos a mujeres y niñas a seguir intereses profesionales en ingeniería y ciencias, fomentando la diversidad en STEM.",
      pillars: ["Liderazgo Femenino", "Equidad en STEM", "Mentoría"],
      board: { chair: "Chair WIE Ficticio", advisor: "Advisor WIE Ficticio" },
      socialLink: "https://events.vtools.ieee.org/",
      email: "wie@ieee.udistrital.edu.co"
    },
  ];

  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl min-h-screen">
      <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="mb-4 bg-ieee-blue/10 text-ieee-blue dark:text-ieee-cyan border-ieee-blue/20">Ecosistema Técnico</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Nuestros Capítulos</h1>
        <p className="text-muted-foreground text-lg">
          Los capítulos estudiantiles son la representación local de las sociedades técnicas globales del IEEE. ¡Encuentra tu pasión tecnológica y únete a un equipo!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {chapters.map((chapter, idx) => {
          const isAffinity = chapter.status === "Afinidad";
          return (
            <ChapterQuickView key={idx} chapter={chapter}>
              <Card className="hover:shadow-xl transition-shadow border-t-4 border-t-ieee-blue flex flex-col h-full overflow-hidden">
                <CardHeader className="flex-grow flex flex-col items-center text-center p-8">
                  <div className="w-32 h-32 relative flex items-center justify-center mb-6">
                    <Image src={`/images/logos/${chapter.acronym}_Black.png`} alt={chapter.name} fill className="object-contain dark:hidden" />
                    <Image src={`/images/logos/${chapter.acronym}_White.png`} alt={chapter.name} fill className="object-contain hidden dark:block" />
                  </div>
                  <CardTitle className="text-2xl leading-tight">{chapter.name}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto bg-muted/30 pt-6 border-t flex justify-center">
                  <Badge variant={isAffinity ? "default" : "secondary"} className={`text-sm px-4 py-1 ${isAffinity ? "bg-ud-gold hover:bg-ud-gold/90 text-black" : ""}`}>
                    {isAffinity ? "Grupo de Afinidad" : "Capítulo Técnico"}
                  </Badge>
                </CardContent>
              </Card>
            </ChapterQuickView>
          );
        })}
      </div>
    </div>
  );
}

