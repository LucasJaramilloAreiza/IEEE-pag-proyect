import { Paper } from "@/types/events";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export function ResourcesDownload({ papers }: { papers: Paper[] }) {
  return (
    <div className="rounded-xl border divide-y overflow-hidden">
      {papers.map(p => (
        <div key={p.id} className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card hover:bg-accent/50 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-ieee-blue dark:text-ieee-cyan" />
              <h4 className="font-medium">{p.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground pl-6">{p.authors.join(", ")}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Download size={16} /> Descargar PDF
          </Button>
        </div>
      ))}
    </div>
  );
}
