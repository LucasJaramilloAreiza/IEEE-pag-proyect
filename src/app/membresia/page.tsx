import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Zap, Users, BookOpen } from "lucide-react";

export const metadata = {
  title: "Membresía - IEEE Universidad Distrital",
  description: "Únete a la Rama Estudiantil IEEE UD y accede a beneficios globales, red de contactos e investigación.",
};

export default function MembresiaPage() {
  return (
    <div className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-4xl mx-auto space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Membresía <span className="text-ieee-blue dark:text-ieee-cyan">IEEE</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sé parte de la organización profesional técnica más grande del mundo y acelera tu desarrollo profesional en la Universidad Distrital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Card>
            <CardHeader className="space-y-2">
              <Zap className="text-ieee-blue h-8 w-8" />
              <CardTitle className="text-lg">Acceso Técnico</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Acceso a la biblioteca digital IEEE Xplore, descuentos en conferencias e IEEE Spectrum.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-2">
              <Users className="text-ieee-blue h-8 w-8" />
              <CardTitle className="text-lg">Networking Global</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Conexión con profesionales, investigadores y ramas estudiantiles en más de 160 países.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-2">
              <BookOpen className="text-ieee-blue h-8 w-8" />
              <CardTitle className="text-lg">Capítulos Técnicos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Involúcrate en CAS, PELS, RAS, PES, CS, WIE y más unidades operativas locales.
            </CardContent>
          </Card>
        </div>

        <div className="p-8 rounded-3xl bg-ieee-blue/10 border border-ieee-blue/20 space-y-6">
          <h2 className="text-2xl font-bold">¿Listo para unirte?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Haz clic a continuación para registrarte oficialmente en la plataforma internacional del IEEE.
          </p>
          <Button render={<a href="https://www.ieee.org/membership/join/?WT_mc_id=hc_join" target="_blank" rel="noopener noreferrer" />} size="lg" className="bg-ieee-blue hover:bg-ieee-cyan text-white px-8 h-14 text-lg">
            Ir al Formulario Oficial de IEEE <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
