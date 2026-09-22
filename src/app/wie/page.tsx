import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Award, Sparkles, ExternalLink } from "lucide-react";

export const metadata = {
  title: "WIE - IEEE Women in Engineering Universidad Distrital",
  description: "Grupo de afinidad IEEE WIE en la Universidad Distrital dedicado a promover la inclusión, el liderazgo femenino y la participación de las mujeres en áreas STEM.",
};

export default function WIEPage() {
  return (
    <div className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wide">
            <Heart size={14} />
            Grupo de Afinidad
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            IEEE <span className="text-purple-600 dark:text-purple-400">Women in Engineering</span> UD
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Iniciativa global y local dedicada a promover a las mujeres científicas e ingenieras e inspirar a niñas de todo el mundo a seguir sus intereses en carreras de ciencia, tecnología, ingeniería y matemáticas (STEM).
          </p>
        </div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:border-purple-400/50 transition-colors shadow-sm">
            <CardHeader className="space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Users size={24} />
              </div>
              <CardTitle className="text-xl">Liderazgo e Inclusión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fomentamos espacios de desarrollo profesional, mentoría y trabajo en equipo para potenciar el talento de nuestras voluntarias en roles de liderazgo.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-purple-400/50 transition-colors shadow-sm">
            <CardHeader className="space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles size={24} />
              </div>
              <CardTitle className="text-xl">Eventos y Hackathons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Co-organización de competencias como la MicroJam Competition (Hardware Hackathon), talleres técnicos y paneles de divulgación tecnológica.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-purple-400/50 transition-colors shadow-sm">
            <CardHeader className="space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Award size={24} />
              </div>
              <CardTitle className="text-xl">Red Global IEEE</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conexión con la red internacional de más de 30,000 miembros WIE a nivel mundial, participando en cumbres de la Sección Colombia y Región 9.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold">¡Haz parte de IEEE WIE UD!</h2>
            <p className="text-purple-100 text-sm md:text-base">
              Abierto a todos los estudiantes y profesionales apasionados por la equidad y el impacto tecnológico.
            </p>
          </div>
          <Button render={<a href="https://www.ieee.org/membership/join/?WT_mc_id=hc_join" target="_blank" rel="noopener noreferrer" />} className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-6 h-12 shrink-0">
            Únete a IEEE WIE <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>

      </div>
    </div>
  );
}
