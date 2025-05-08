"use client";
import React, { useEffect, useState } from 'react';
import {ProjectModel} from "@/models/ProjectModel";
import { usePrisma } from '@/services/prisma';
import ProjectComponent from '@/components/projects/ProjectComponent';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

function Projects() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const prisma = usePrisma();
  const router = useRouter();
  
  const fetchProject = async () => {
    try {
      const response = await prisma.getProjects();
      setProjects(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  }

  useEffect(()=>{
    fetchProject();
  },[])

  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-10">
        <div className="flex flex-col md:justify-between">
            <section>
              <div className="flex items-center">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                    <ChevronLeft />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold ml-1">
                  Mes projets personnels et scolaires<span className='text-[#41806C]'>.</span>
                </h1>
              </div>
              <hr className="border-b-2 border-[#41806C] w-36 my-4" />
            </section>
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectComponent key={project.id} project={project} />
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <Spinner/>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Projects;