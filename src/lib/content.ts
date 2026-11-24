import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import keystaticConfig from "../../keystatic.config";

/**
 * Acceso al contenido editable (carpeta /content, editada desde /keystatic).
 * Todas las páginas leen de aquí; nunca hay que tocar código para cambiar datos.
 */
const reader = createReader(process.cwd(), keystaticConfig);

const IS_DEV = process.env.NODE_ENV === "development";
const byOrder = <T extends { orden: number | null }>(a: T, b: T) => (a.orden ?? 100) - (b.orden ?? 100);

/* ───────────── Fechas ───────────── */

/** Fecha de hoy en Bogotá, formato YYYY-MM-DD. */
export function todayIso() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const parts = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
};

/** "25 jun 2026" · "7–8 nov 2025" · "30 nov – 2 dic 2025" */
export function formatDateRange(inicio: string, fin?: string | null) {
  const a = parts(inicio);
  if (!fin || fin === inicio) return `${a.d} ${MESES[a.m - 1]} ${a.y}`;
  const b = parts(fin);
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${MESES[a.m - 1]} ${a.y}`;
  if (a.y === b.y) return `${a.d} ${MESES[a.m - 1]} – ${b.d} ${MESES[b.m - 1]} ${a.y}`;
  return `${a.d} ${MESES[a.m - 1]} ${a.y} – ${b.d} ${MESES[b.m - 1]} ${b.y}`;
}

/** Día y mes corto para "badges" de calendario. */
export function dateBadge(iso: string) {
  const { d, m } = parts(iso);
  return { dia: String(d), mes: MESES[m - 1] };
}

/* ───────────── Sitio ───────────── */

export const getSitio = cache(async () => {
  const s = await reader.singletons.sitio.read();
  if (!s) throw new Error("Falta content/sitio.yaml");
  return s;
});

/* ───────────── Eventos ───────────── */

export type Evento = Awaited<ReturnType<typeof readEventos>>[number];

async function readEventos() {
  const all = await reader.collections.eventos.all();
  const hoy = todayIso();
  return all.map(({ slug, entry }) => {
    const fin = entry.fechaFin || entry.fechaInicio || "";
    return {
      ...entry,
      slug,
      fechaInicio: entry.fechaInicio ?? "",
      fechaTexto: formatDateRange(entry.fechaInicio ?? "", entry.fechaFin),
      proximo: fin >= hoy,
    };
  });
}

export const getEventos = cache(readEventos);

/** Próximos eventos, del más cercano al más lejano. */
export async function getProximosEventos() {
  return (await getEventos()).filter((e) => e.proximo).sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
}

/** Memorias (eventos pasados), del más reciente al más antiguo. */
export async function getMemorias() {
  return (await getEventos()).filter((e) => !e.proximo).sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
}

export async function getEvento(slug: string) {
  return (await getEventos()).find((e) => e.slug === slug) ?? null;
}

/* ───────────── Capítulos ───────────── */

export type Capitulo = Awaited<ReturnType<typeof readCapitulos>>[number];

async function readCapitulos() {
  const all = await reader.collections.capitulos.all();
  return all
    .map(({ slug, entry }) => ({ ...entry, slug }))
    .filter((c) => c.activo)
    .sort(byOrder);
}

export const getCapitulos = cache(readCapitulos);

export async function getCapitulo(slug: string) {
  return (await getCapitulos()).find((c) => c.slug === slug) ?? null;
}

/* ───────────── Equipo, proyectos, aliados ───────────── */

export const getEquipo = cache(async () =>
  (await reader.collections.equipo.all()).map(({ slug, entry }) => ({ ...entry, slug })).sort(byOrder)
);

export const getProyectos = cache(async () =>
  (await reader.collections.proyectos.all()).map(({ slug, entry }) => ({ ...entry, slug })).sort(byOrder)
);

export const getAliados = cache(async () =>
  (await reader.collections.aliados.all()).map(({ slug, entry }) => ({ ...entry, slug })).sort(byOrder)
);

/* ───────────── Historias ───────────── */

/** Historias publicadas (en desarrollo también se ven los borradores). */
export const getHistorias = cache(async () =>
  (await reader.collections.historias.all())
    .map(({ slug, entry }) => ({ ...entry, slug, fecha: entry.fecha ?? "" }))
    .filter((h) => h.publicado || IS_DEV)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
);

export async function getHistoria(slug: string) {
  const entry = await reader.collections.historias.read(slug, { resolveLinkedFiles: true });
  if (!entry || (!entry.publicado && !IS_DEV)) return null;
  return { ...entry, slug, fecha: entry.fecha ?? "" };
}

/* ───────────── Utilidades ───────────── */

/** Iniciales para avatares sin foto. */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
