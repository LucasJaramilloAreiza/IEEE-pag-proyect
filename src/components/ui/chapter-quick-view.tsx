"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink, Mail, User, Users } from "lucide-react";
import React from "react";

export interface Chapter {
  name: string;
  status: string;
  acronym: string;
  purpose?: string;
  pillars?: string[];
  board?: {
    chair: string;
    advisor: string;
  };
  socialLink?: string;
  email?: string;
}

export function ChapterQuickView({ chapter, children }: { chapter: Chapter; children: React.ReactNode }) {
  const isAffinity = chapter.status === "Afinidad";

  return (
    <Dialog>
      <DialogTrigger render={<div className="cursor-pointer h-full transition-transform hover:-translate-y-2" />} nativeButton={false}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] gap-6">
        <DialogHeader className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 relative flex items-center justify-center">
            <Image
              src={`/images/logos/${chapter.acronym}_Black.png`}
              alt={chapter.name}
              fill
              className="object-contain dark:hidden"
            />
            <Image
              src={`/images/logos/${chapter.acronym}_White.png`}
              alt={chapter.name}
              fill
              className="object-contain hidden dark:block"
            />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold">{chapter.name}</DialogTitle>
            <Badge
              variant={isAffinity ? "default" : "secondary"}
              className={`text-xs ${isAffinity ? "bg-ud-gold text-black hover:bg-ud-gold/90" : ""}`}
            >
              {isAffinity ? "Grupo de Afinidad Activo" : "Capítulo Estudiantil Activo"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {chapter.purpose && (
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm text-muted-foreground leading-relaxed">{chapter.purpose}</p>
            </div>
          )}

          {chapter.pillars && chapter.pillars.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-ieee-blue dark:text-ieee-cyan" />
                Áreas Clave
              </h4>
              <div className="flex flex-wrap gap-2">
                {chapter.pillars.map((pillar, idx) => (
                  <Badge key={idx} variant="outline" className="bg-muted/50">
                    {pillar}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {chapter.board && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-ieee-blue dark:text-ieee-cyan" />
                Mesa Directiva
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/30 p-3 rounded-lg border">
                  <p className="font-semibold">{chapter.board.chair}</p>
                  <p className="text-xs text-muted-foreground">Chair (Presidente)</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border">
                  <p className="font-semibold">{chapter.board.advisor}</p>
                  <p className="text-xs text-muted-foreground">Faculty Advisor</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-3 pt-4 border-t">
          {chapter.socialLink && (
            <Button
              className="flex-1 bg-ieee-blue hover:bg-ieee-cyan text-white gap-2"
              onClick={() => window.open(chapter.socialLink, "_blank")}
            >
              Redes / vTools <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          {chapter.email && (
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => { window.location.href = `mailto:${chapter.email}`; }}
            >
              Contactar <Mail className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


