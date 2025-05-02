"use client";
import React, { useEffect, useState } from 'react';
import {ProjectModel} from "@/models/ProjectModel";
import { usePrisma } from '@/services/prisma';
import ProjectComponent from '@/components/projects/ProjectComponent';

function Projects() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const prisma = usePrisma();
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
            <h1 className="text-xl md:text-2xl font-bold">
              Mes projets personnels et scolaires<span className='text-[#41806C]'>.</span>
            </h1>
            <hr className="border-b-2 border-[#41806C] w-36 my-4" />
            <h2>  </h2>
          </section>
          <div className="grid grid-cols-3">
              
          </div>
          <div className="projects">
            {projects.map((project)=>{
              return(
                <ProjectComponent key={project.id} project={project}/>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Projects;