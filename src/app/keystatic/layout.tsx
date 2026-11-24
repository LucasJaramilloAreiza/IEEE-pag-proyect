import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Panel de contenido · IEEE UD",
  robots: { index: false, follow: false },
};

/** En producción el panel solo existe si está conectado a GitHub (requiere iniciar sesión). */
const panelDisponible =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

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
