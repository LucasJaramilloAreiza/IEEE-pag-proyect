import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { panelDisponible } from "../../../keystatic.config";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Panel de contenido · IEEE UD",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!panelDisponible) notFound();
  return (
    <html lang="es">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
