import { Speaker } from "@/types/events";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {speakers.map(spk => (
        <Card key={spk.id} className="overflow-hidden bg-card/50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden bg-muted flex-shrink-0">
              {spk.photoUrl && <Image src={spk.photoUrl} alt={spk.name} fill className="object-cover" />}
            </div>
            <div>
              <h4 className="font-bold">{spk.name}</h4>
              <p className="text-sm text-ieee-cyan">{spk.role}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
