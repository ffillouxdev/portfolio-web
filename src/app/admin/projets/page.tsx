"use client";
import ProjectAdminComponent from '@/components/admin/ProjectAdminComponent';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ProjectModel } from '@/models/ProjectModel';
import { usePrisma } from '@/services/prisma';
import { ChevronLeft, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ProjectsAdminPage() {
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const prisma = usePrisma();
    const router = useRouter();

    const fetchProjects = async () => {
        try {
          const data = await prisma.getProjects();
          setProjects(data);
        } catch (error) {
          console.error('Error fetching Projects:', error);
        }
      };
    useEffect(()=>{
        fetchProjects()
    },[])


    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex md:items-center flex-col md:flex-row md:justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                  <ChevronLeft />
                </Button>
                <h1 className="text-2xl font-bold flex items-center">Projets<UserCog className='ml-2'/></h1>
              </div>
            </div>
            <section className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectAdminComponent key={project.id} project={project} />
                ))
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <Spinner/>
                </div>
              )}
            </section>
    </main>
  )
}

export default ProjectsAdminPage;
