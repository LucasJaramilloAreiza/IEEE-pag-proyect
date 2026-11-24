import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { getSitio } from "@/lib/content";

const EXPLORE = [
  { href: "/eventos", label: "Próximos eventos" },
  { href: "/memorias", label: "Memorias" },
  { href: "/capitulos", label: "Capítulos" },
  { href: "/investigacion", label: "Investigación" },
  { href: "/historias", label: "Historias" },
  { href: "/wie", label: "Women in Engineering" },
];

const PARTICIPA = [
  { href: "/unete", label: "Únete / voluntariado" },
  { href: "/equipo", label: "Mesa directiva" },
  { href: "/aliados", label: "Aliados y empresas" },
];

export async function Footer() {
  const sitio = await getSitio();
  const social = [
    sitio.instagram && { href: sitio.instagram, label: "Instagram" },
    sitio.linkedin && { href: sitio.linkedin, label: "LinkedIn" },
    sitio.whatsapp && { href: sitio.whatsapp, label: "WhatsApp" },
    { href: "https://events.vtools.ieee.org/", label: "IEEE vTools" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="relative mt-8 overflow-hidden border-t bg-muted/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Image src="/images/brand/rama-color.png" alt="Rama Estudiantil IEEE UD" width={170} height={50} className="h-11 w-auto dark:hidden" />
          <Image src="/images/brand/rama-white.png" alt="Rama Estudiantil IEEE UD" width={170} height={50} className="hidden h-11 w-auto dark:block" />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Comunidad estudiantil de la Universidad Distrital Francisco José de Caldas que impulsa la innovación,
            el liderazgo y la divulgación científica. Rama STB04331 · Región 9.
          </p>
          {sitio.correo && (
            <a href={`mailto:${sitio.correo}`} className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
              <Mail className="size-4" /> {sitio.correo}
            </a>
          )}
        </div>

        <FooterList title="Explora" links={EXPLORE} />
        <FooterList title="Participa" links={PARTICIPA} />

        <div>
          <h3 className="mb-4 text-sm font-semibold">Síguenos</h3>
          <ul className="grid gap-2.5 text-sm">
            {social.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-brand">
                  {l.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rama Estudiantil IEEE Universidad Distrital. Hecho por y para estudiantes.
        </p>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <ul className="grid gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted-foreground transition-colors hover:text-brand">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
