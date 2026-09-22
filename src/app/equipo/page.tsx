import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";

const team = [
  { id: 1, name: "Jhoseph Pinzon Hernandez", role: "Chair", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jhoseph" },
  { id: 2, name: "Jose David Cely", role: "Counselor (Consejero)", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jose" },
  { id: 3, name: "Javier Torres", role: "Vice Chair", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier" },
  { id: 4, name: "Juanita Ramirez", role: "Secretary", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juanita" },
  { id: 5, name: "Fabio Sierra", role: "Treasurer", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fabio" },
  { id: 6, name: "Daniel Espinosa Lopez", role: "Webmaster", linkedIn: "#", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel" },
];

export default function EquipoPage() {
  return (
    <div className="container py-16 max-w-6xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Mesa Directiva de Rama</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Conoce a los líderes y voluntarios que hacen posible el funcionamiento de la Rama Estudiantil IEEE UD (STB04331).
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-32 h-32 relative mb-4 rounded-full overflow-hidden bg-muted">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-ieee-cyan font-medium mb-4">{member.role}</p>
              <a href={member.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 rounded-full bg-muted hover:bg-ieee-blue hover:text-white transition-colors text-muted-foreground">
                <LinkIcon size={20} />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
