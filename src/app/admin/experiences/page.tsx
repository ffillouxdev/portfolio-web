"use client";
import ExperienceAdminComponent from '@/components/admin/ExperienceAdminComponent';
import { Button } from '@/components/ui/button';
import { ExperienceModel } from '@/models/ExperienceModel';
import { usePrisma } from '@/services/prisma';
import { ChevronLeft, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ExpsAdminPage() {
    const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
    const prisma = usePrisma();
    const router = useRouter();

    const fetchExperiences = async () => {
        try {
          const data = await prisma.getExperiences();
          setExperiences(data);
        } catch (error) {
          console.error('Error fetching experiences:', error);
        }
      };
    useEffect(()=>{
        fetchExperiences()
    },[])
    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex md:items-center flex-col md:flex-row md:justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                  <ChevronLeft />
                </Button>
                <h1 className="text-2xl font-bold flex items-center">Expériences <UserCog className='ml-2'/></h1>
              </div>
            </div>
            <section className="space-y-4">
                {experiences.map((exp) => (
                    <ExperienceAdminComponent
                        key={exp.id}
                        id={exp.id}
                        title={exp.title}
                        date={exp.date}
                        skills={exp.skills}
                        desc={exp.desc}
                        link={exp.link}
                        jobTitle={exp.jobTitle}
                    />
                ))}
            </section>
    </main>
  )
}

export default ExpsAdminPage;
