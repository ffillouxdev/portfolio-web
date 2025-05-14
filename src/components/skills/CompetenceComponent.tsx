import React from 'react';
import { CompetenceModel } from '@/models/CompetenceModel';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';  
import { Link } from 'lucide-react';

interface CompetenceModelProps {
  comp: CompetenceModel;
}

export default function CompetenceComponent({ comp }: CompetenceModelProps) {
  return (
    <Card className="p-6 border rounded-xl shadow-lg w-full bg-white text-md">
      {comp.links.length > 0 && (
        <div className="flex justify-between items-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge className="cursor-pointer w-fit" variant="secondary">
                Liens utiles <Link/>
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-[400px] bg-white shadow-md border p-4 rounded-md">
              <p className="text-sm font-semibold mb-2 text-gray-800">Liens associés :</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-[#41806C]">
                {comp.links.slice(0, 8).map((link, idx) => (
                  <li key={idx}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
          <Avatar>
            <AvatarImage src={comp.sourceAvatar} />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
        </div>
      )}
      <p className="text-sm text-gray-700">{comp.desc}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Framework{comp.frameworks.length > 1 ? 's' : ''} :</p>
          <div className="flex flex-wrap gap-2 max-w-sm">
            {comp.frameworks.map((fram, idx) => (
              <Badge key={idx} variant="default">
                {fram}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Librairie{comp.librairies.length > 1 ? 's' : ''} :</p>
          <div className="flex flex-wrap gap-2 ml-1 max-w-sm">
            {comp.librairies.map((lib, idx) => (
              <Badge key={idx} variant="outline">
                {lib}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{comp.title}</h2>
        <p className="text-xs text-gray-500 mt-1">
          Projets réalisés : {comp.nbProjects}
        </p>
      </div>
    </Card>
  );
}
