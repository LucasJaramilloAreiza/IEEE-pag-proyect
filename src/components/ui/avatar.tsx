import Image from "next/image";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Foto de perfil o, si no hay, iniciales sobre un degradado de marca. */
export function Avatar({ name, src, className }: { name: string; src?: string | null; className?: string }) {
  return (
    <div className={cn("relative grid size-full place-items-center overflow-hidden rounded-full bg-gradient-to-br from-ieee-blue to-ieee-cyan text-white", className)}>
      {src ? (
        <Image src={src} alt={name} fill sizes="160px" className="object-cover" />
      ) : (
        <span className="text-[2.2em] font-extrabold tracking-tight" aria-label={name}>{initials(name)}</span>
      )}
    </div>
  );
}
