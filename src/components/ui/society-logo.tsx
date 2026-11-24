import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo de capítulo con versión clara/oscura según el tema; si falta, muestra la sigla. */
export function SocietyLogo({
  claro,
  oscuro,
  alt,
  className,
}: {
  claro?: string | null;
  oscuro?: string | null;
  alt: string;
  className?: string;
}) {
  const light = claro || oscuro;
  const dark = oscuro || claro;
  return (
    <div className={cn("relative", className)}>
      {light ? (
        <>
          <Image src={light} alt={alt} fill sizes="160px" className="object-contain dark:hidden" />
          <Image src={dark!} alt={alt} fill sizes="160px" className="hidden object-contain dark:block" />
        </>
      ) : (
        <span className="grid size-full place-items-center text-xl font-extrabold text-brand">{alt}</span>
      )}
    </div>
  );
}
