// TEMPORAL: diagnóstico de variables de entorno (solo dice si existen, nunca sus valores).
export const dynamic = "force-dynamic";

const NAMES = [
  "NEXT_PUBLIC_KEYSTATIC_STORAGE",
  "NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
  "KEYSTATIC_GITHUB_CLIENT_ID",
  "KEYSTATIC_GITHUB_CLIENT_SECRET",
  "KEYSTATIC_SECRET",
];

export function GET() {
  const env = process.env;
  const runtime = Object.fromEntries(NAMES.map((n) => [n, Boolean(env[n])]));
  const build = {
    NEXT_PUBLIC_KEYSTATIC_STORAGE: Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE),
    NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG),
  };
  return Response.json({ runtime, build, vercelEnv: env.VERCEL_ENV ?? null });
}
