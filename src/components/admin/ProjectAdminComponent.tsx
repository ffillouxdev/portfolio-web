 import { ProjectModel } from '@/models/ProjectModel';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2 } from "lucide-react";
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from 'next/image';
import { buttonVariants } from '../ui/button';
import { sanitize } from '@/utils/functions';

interface Props {
  project: ProjectModel;
}

function ProjectAdminComponent({ project }: Props) {
  const skills: string[] = Array.isArray(project.skills) ? project.skills as string[] : JSON.parse(project.skills as unknown as string);  
  const screens: string[] = Array.isArray(project.screens) ? project.screens as string[] : JSON.parse(project.screens as unknown as string);  
  const firstScreen = `/assets/project/${sanitize(project.title)}/${screens[0]}`;

  const caseLabel = {
    Studies: "Études",
    Internship: "Stage",
    Job: "Travail"
  }[project.whichCase];

  return (
    <Card 
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
            <Link href={`/admin/editer-projet/${project.id}`} className={`${buttonVariants({ variant: "outline" })} text-black max-w-32 md:max-w-full mt-2 md:mt-0`}>
                Editer <Edit2 />
            </Link>
          </div>
        </HoverCardContent>
      </HoverCard>
    </Card>
  );
}

export default ProjectAdminComponent;