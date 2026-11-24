import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const panelDisponible =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

const handler = makeRouteHandler({ config });
const bloqueado = () => new Response("Not found", { status: 404 });

export const GET = panelDisponible ? handler.GET : bloqueado;
export const POST = panelDisponible ? handler.POST : bloqueado;
