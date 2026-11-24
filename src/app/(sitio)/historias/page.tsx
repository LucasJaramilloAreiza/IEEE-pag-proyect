import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PenLine, Quote } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { formatDateRange, getHistorias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Historias",
  description: "Proyectos, viajes y aprendizajes contados por los miembros de la Rama Estudiantil IEEE UD.",
};

export default async function HistoriasPage() {
  const historias = await getHistorias();

  return (
    <>
      <PageHero
        eyebrow={<><PenLine className="size-3.5" /> Historias</>}
        title={<>Contado por quienes lo <span className="text-gradient">viven</span></>}
        description="Proyectos, competencias, viajes y aprendizajes de nuestros miembros, en primera persona."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        {historias.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed bg-card/60 p-10 text-center">
            <Quote className="mx-auto size-10 text-brand/40" />
            <h2 className="mt-4 text-xl font-bold">Muy pronto, nuestras primeras historias</h2>
            <p className="mt-2 text-muted-foreground">¿Tienes un proyecto o experiencia que contar? Escríbenos y la publicamos.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {historias.map((h, i) => (
              <Reveal key={h.slug} delay={(i % 3) * 0.05}>
                <Link href={`/historias/${h.slug}`} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col overflow-hidden">
                    <div className="relative m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-ieee-blue to-ieee-cyan">
                      {h.portada ? (
                        <Image src={h.portada} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <Quote className="absolute left-5 top-5 size-12 text-white/40" />
                      )}
                      {!h.publicado && <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-black">Borrador</span>}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="text-xs text-muted-foreground">{formatDateRange(h.fecha)}</p>
                      <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-brand">{h.titulo}</h2>
                      {h.resumen && <p className="flex-1 text-sm text-muted-foreground">{h.resumen}</p>}
                      <p className="text-sm font-semibold">{h.autor}<span className="font-normal text-muted-foreground"> · {h.rolAutor}</span></p>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
