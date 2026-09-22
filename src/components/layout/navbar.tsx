"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" alt="IEEE Logo" className="h-8 dark:brightness-0 dark:invert" /> <span className="font-bold text-xl text-ieee-blue dark:text-ieee-cyan ml-2 hidden sm:inline-block">Universidad Distrital</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-ieee-cyan">Inicio</Link>
          <Link href="/capitulos" className="text-sm font-medium transition-colors hover:text-ieee-cyan">Capítulos</Link>
          <Link href="/equipo" className="text-sm font-medium transition-colors hover:text-ieee-cyan">Equipo</Link>
          <Link href="/memorias" className="text-sm font-medium transition-colors hover:text-ieee-cyan">Memorias</Link>
          <Link href="/investigacion" className="text-sm font-medium transition-colors hover:text-ieee-cyan">Investigación</Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Button render={<a href="https://www.ieee.org/membership/join/?WT_mc_id=hc_join" target="_blank" rel="noopener noreferrer" />} className="hidden md:inline-flex bg-ieee-blue text-white hover:bg-ieee-cyan">Únete al IEEE</Button>
          
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full left-0 top-[64px]">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-ieee-cyan" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
            <Link href="/capitulos" className="text-sm font-medium transition-colors hover:text-ieee-cyan" onClick={() => setIsMobileMenuOpen(false)}>Capítulos</Link>
            <Link href="/equipo" className="text-sm font-medium transition-colors hover:text-ieee-cyan" onClick={() => setIsMobileMenuOpen(false)}>Equipo</Link>
            <Link href="/memorias" className="text-sm font-medium transition-colors hover:text-ieee-cyan" onClick={() => setIsMobileMenuOpen(false)}>Memorias</Link>
            <Link href="/investigacion" className="text-sm font-medium transition-colors hover:text-ieee-cyan" onClick={() => setIsMobileMenuOpen(false)}>Investigación</Link>
          </nav>
          <div className="pt-4 border-t">
             <Button render={<a href="https://www.ieee.org/membership/join/?WT_mc_id=hc_join" target="_blank" rel="noopener noreferrer" />} className="w-full bg-ieee-blue text-white hover:bg-ieee-cyan">Únete al IEEE</Button>
          </div>
        </div>
      )}
    </header>
  );
}
