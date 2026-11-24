import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { panelDisponible } from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });
const bloqueado = () => new Response("Not found", { status: 404 });

export const GET = panelDisponible ? handler.GET : bloqueado;
export const POST = panelDisponible ? handler.POST : bloqueado;
