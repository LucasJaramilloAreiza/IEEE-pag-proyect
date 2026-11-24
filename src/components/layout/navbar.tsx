"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/eventos", label: "Eventos" },
  { href: "/capitulos", label: "Capítulos" },
  { href: "/investigacion", label: "Investigación" },
  { href: "/historias", label: "Historias" },
  { href: "/equipo", label: "Equipo" },
  { href: "/aliados", label: "Aliados" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border px-3 pl-4 transition-all duration-300",
          scrolled || open
            ? "border-border bg-background/75 shadow-lg shadow-black/[0.04] backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-md"
        )}
      >
        <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center" aria-label="IEEE Universidad Distrital — Inicio">
          <Image src="/images/brand/rama-color.png" alt="Rama Estudiantil IEEE UD" width={130} height={38} priority className="h-8 w-auto dark:hidden" />
          <Image src="/images/brand/rama-white.png" alt="Rama Estudiantil IEEE UD" width={130} height={38} priority className="hidden h-8 w-auto dark:block" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive(pathname, l.href) && "bg-brand-soft text-brand hover:bg-brand-soft hover:text-brand"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Cambiar tema claro/oscuro"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Sun className="hidden size-[1.1rem] dark:block" />
            <Moon className="size-[1.1rem] dark:hidden" />
          </Button>
          <Button
            render={<Link href="/unete" />}
            className="group hidden h-9 rounded-full px-4 font-semibold sm:inline-flex"
          >
            Únete
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 mx-auto mt-2 max-w-6xl rounded-3xl border bg-background/95 p-3 shadow-xl backdrop-blur-xl duration-200 lg:hidden">
          <nav className="grid gap-1" aria-label="Principal (móvil)">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted",
                  isActive(pathname, l.href) && "bg-brand-soft text-brand"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Button render={<Link href="/unete" onClick={() => setOpen(false)} />} className="mt-2 h-12 w-full rounded-2xl text-base font-semibold">
            Únete a la Rama <ArrowRight />
          </Button>
        </div>
      )}
    </header>
  );
}
