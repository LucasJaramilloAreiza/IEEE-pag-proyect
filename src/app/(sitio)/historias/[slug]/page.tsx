import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdocContent } from "@/components/ui/markdoc-content";
import { Avatar } from "@/components/ui/avatar";
import { formatDateRange, getCapitulo, getHistoria, getHistorias } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getHistorias()).map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const h = await getHistoria((await params).slug);
  if (!h) return {};
  return { title: h.titulo, description: h.resumen, openGraph: h.portada ? { images: [h.portada] } : undefined };
}

export default async function HistoriaPage({ params }: Props) {
  const historia = await getHistoria((await params).slug);
  if (!historia) notFound();
  const capitulo = historia.capitulo ? await getCapitulo(historia.capitulo) : null;

  return (
    <article className="pb-20">
      <header className="relative overflow-hidden border-b">
        <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl space-y-6 px-4 pb-12 pt-10">
          <Link href="/historias" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Todas las historias
          </Link>
          <div className="animate-in fade-in slide-in-from-bottom-3 space-y-5 duration-700">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {capitulo && <Link href={`/capitulos/${capitulo.slug}`} className="rounded-full bg-brand-soft px-3 py-1 text-brand">IEEE {capitulo.sigla}</Link>}
              {!historia.publicado && <span className="rounded-full bg-amber-400 px-3 py-1 text-black">Borrador · solo visible en local</span>}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{historia.titulo}</h1>
            {historia.resumen && <p className="text-xl leading-relaxed text-muted-foreground">{historia.resumen}</p>}
            <div className="flex items-center gap-3">
              <div className="size-11 text-[0.45rem]"><Avatar name={historia.autor || "IEEE UD"} /></div>
              <div className="text-sm">
                <p className="font-semibold">{historia.autor}</p>
                <p className="text-muted-foreground">{historia.rolAutor} · {formatDateRange(historia.fecha)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {historia.portada && (
        <div className="mx-auto mt-10 max-w-4xl px-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border shadow-2xl shadow-brand/10">
            <Image src={historia.portada} alt="" fill priority sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-3xl px-4">
        <MarkdocContent node={historia.contenido.node} />
      </div>
    </article>
  );
}
