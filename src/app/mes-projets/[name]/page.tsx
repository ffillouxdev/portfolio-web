"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectModel } from '@/models/ProjectModel';
import { usePrisma } from '@/services/prisma';
import { capitalizeFirstLetter } from '@/utils/functions';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function SpecificPage() {
    const prisma = usePrisma();
    const [project, setProject] = useState<ProjectModel>();
    const params = useParams();
    const router = useRouter();
    const rawName = params.name;
    const name = typeof rawName === 'string' ? rawName : Array.isArray(rawName) ? rawName[0] : '';
    const formattedName = capitalizeFirstLetter(decodeURIComponent(name.split('-').join(' ')));
    const caseLabel = {
        Studies: "mes études",
        Internship: "mon stage",
        Job: "mon travail"
    }[project?.whichCase ?? "Studies"]; 
    

    const fetchProjectDatas = async () =>{
        try {
            const response = await prisma.getProjectByName(name as string);
            setProject(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des infos du projet : ", error);
        }
    }

    useEffect(()=>{
        fetchProjectDatas();
    }, [])


    if (!project){
        return(
            <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
                <div className="w-full md:w-3xl my-10">
                    <div className="flex flex-col justify-center space-y-5">
                        <section>
                            <div className="flex items-center">
                                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                                    <ChevronLeft />
                                </Button>
                                <h1 className="text-xl md:text-2xl font-bold ml-1">
                                    Projet {formattedName}<span className='text-[#41806C]'>.</span>
                                </h1>
                            </div>
                            <hr className="border-b-2 border-[#41806C] w-36 my-4" />
                        </section>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
            <div className="w-full md:w-3xl my-10">
                <div className="flex flex-col justify-center space-y-5">
                    <section>
                        <div className="flex items-center">
                            <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                                <ChevronLeft />
                            </Button>
                            <h1 className="text-xl md:text-2xl font-bold ml-1">
                                Projet {formattedName}<span className='text-[#41806C]'>.</span>
                            </h1>
                        </div>
                        <hr className="border-b-2 border-[#41806C] w-36 my-4" />
                    </section>
                    <div className="project-screens h-full flex items-center justify-center w-full">
                        <Carousel className="w-full max-w-[800px]">
                            <CarouselContent className="items-center h-auto max-h-[400px]">
                                {project?.screens?.map((screen, index: number) => {
                                    if (!screen) return <p key={index}>Il n&apos;y a aucune image.</p>;
                                    const screenURL = `/assets/project/${name}/${screen}`;
                                    return (
                                    <CarouselItem
                                        key={index}
                                        className="flex justify-center items-center max-w-[800px] h-auto max-h-[600px] mx-auto"
                                    >
                                        <Image
                                        src={screenURL}
                                        alt={`Écran ${index + 1} - ${project.title}`}
                                        width={800}
                                        height={600}
                                        className="object-cover w-full rounded-lg max-w-[800px] h-full"
                                        priority={index === 0}
                                        />
                                    </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="project-infos space-y-2">
                        <div className="project-skills space-x-1">
                            {project?.skills.map((skill, index: number)=>{
                                if(!skill) return <p key={index}>Il n&apos;y a aucune compétence.</p>
                                return (
                                    <Badge key={index} variant="default">{skill}</Badge>
                                )
                            })}
                        </div>
                        <p className='text-color-secondary'>{project?.desc}</p>
                        <p>Ce projet a été réalisé dans le cadre de <strong>{caseLabel}</strong>.</p>
                        </div>
                </div>
            </div>
        </main>
    )
}
