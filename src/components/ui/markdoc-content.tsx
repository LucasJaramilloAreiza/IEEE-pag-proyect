import Markdoc, { type Node } from "@markdoc/markdoc";
import React from "react";

/** Renderiza el texto enriquecido escrito en el panel (Markdoc). */
export function MarkdocContent({ node }: { node: Node }) {
  const tree = Markdoc.transform(node);
  return <div className="prose-ieee">{Markdoc.renderers.react(tree, React)}</div>;
}
