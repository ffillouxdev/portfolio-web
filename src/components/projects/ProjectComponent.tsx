import { ProjectModel } from '@/models/ProjectModel';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Props {
  project: ProjectModel;
}

function ProjectComponent({ project }: Props) {
  const router = useRouter();
  const skills: string[] = Array.isArray(project.skills)? project.skills as string[]
  : JSON.parse(project.skills as unknown as string);  
  // const screens: string[] = Array.isArray(project.screens)? project.screens as string[]

  const caseLabel = {
    Studies: "Études",
    Internship: "Stage",
    Job: "Travail"
  }[project.whichCase];

  function handleProjectLinkClick() : void {
    router.push(`/mes-projets/${project.title.replace(/\s+/g, '-').toLowerCase()}`);
  }

  return (
    <Card onClick={handleProjectLinkClick}  className="border w-[18vw] p-5 text-md flex flex-col rounded-md border-gray-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <Badge variant="secondary" className="mt-2">{caseLabel}</Badge>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.desc}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <Badge key={index} variant="default">{skill}</Badge>
            ))}
          </div>
        )}

        {/* {screens.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {screens.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Screenshot ${idx + 1}`}
                className="rounded-md border shadow-sm"
              />
            ))}
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}

export default ProjectComponent;
