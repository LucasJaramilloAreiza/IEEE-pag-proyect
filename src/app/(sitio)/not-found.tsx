import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-xl space-y-6 px-4 py-32 text-center">
        <p className="text-gradient text-8xl font-extrabold tracking-tighter">404</p>
        <h1 className="text-3xl font-extrabold">Esta página no existe</h1>
        <p className="text-muted-foreground">Puede que el enlace haya cambiado o que el contenido se haya movido.</p>
        <div className="flex justify-center gap-3">
          <Button render={<Link href="/" />} className="h-11 rounded-full px-6 font-semibold">Ir al inicio</Button>
          <Button render={<Link href="/eventos" />} variant="outline" className="h-11 rounded-full px-6 font-semibold">Ver eventos</Button>
        </div>
      </div>
    </section>
  );
}
