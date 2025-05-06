 import { ProjectModel } from '@/models/ProjectModel';
import React from 'react';
import { Card} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  project: ProjectModel;
}

function ProjectComponent({ project }: Props) {
  const router = useRouter();
  const skills: string[] = Array.isArray(project.skills) ? project.skills as string[] : JSON.parse(project.skills as unknown as string);  
  const screens: string[] = Array.isArray(project.screens) ? project.screens as string[] : JSON.parse(project.screens as unknown as string);  
  const sanitize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')                 
      .replace(/[\u0300-\u036f]/g, '')   
      .replace(/\s+/g, '-');             
  
  const firstScreen = `/assets/project/${sanitize(project.title)}/${screens[0]}`;
  
  const caseLabel = {
    Studies: "Études",
    Internship: "Stage",
    Job: "Travail"
  }[project.whichCase];

  function handleProjectLinkClick() : void {
    router.push(`/mes-projets/${project.title.replace(/\s+/g, '-').toLowerCase()}`);
  }

  return (
    <Card 
      onClick={handleProjectLinkClick}  
      className="relative my-5 w-full z-0 p-5 text-md flex flex-col rounded-md border-gray-100 overflow-hidden"
    >
      <HoverCard>
        <HoverCardTrigger>
          <div>
            <Image 
              src={firstScreen}
              alt={`image du projet de ${project.title}`} 
              fill 
              objectFit="cover"
              className="rounded-md opacity-30"
              
            />
          </div>
            <div className="flex flex-col z-10 relative">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="default">{skill}</Badge>
                  ))}
                </div>
              )}
            </div>
        </HoverCardTrigger>
          <HoverCardContent className="w-[500px] ml-80">
          <p className="text-sm mb-1 truncate text-color-secondary">{project.desc}</p>
          <Badge className='mb-2' variant="outline">{caseLabel}</Badge>
          <div className="flex items-center justify-between">
            <p>{project.date}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
              >
              Lien
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    </Card>
  );
}

export default ProjectComponent;