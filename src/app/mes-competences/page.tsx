"use client";
import { Button } from '@/components/ui/button';
import { CompetenceModel } from '@/models/CompetenceModel';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import CompetenceComponent from '@/components/skills/CompetenceComponent';

export default function MesCompetences() {
    const router = useRouter();
    const [competences, setCompetences] = useState<CompetenceModel[]>([
        {
            title: "React.js",
            librairies: ["React DOM", "React Router"],
            frameworks: ["Next.js"],
            links: ["https://reactjs.org", "https://nextjs.org"],
            desc: "Bibliothèque JavaScript pour construire des interfaces utilisateurs.",
            nbProjects: 5
        },
        {
            title : "Vue.js",
            librairies: ["Vue Router 3", "Vite"],
            frameworks: ["Vue.js"],
            links : ["https://ffillouxdev.github.io/my-beautiful-vue-app/"],
            desc : "J'ai appris ce framework JavaScript durant ma seconde année de formation, c'est un framework moins libre que React et qui a des avantages.",
            nbProjects : 4
        }
    ]);

    return (
        <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
            <div className="w-full md:w-3xl my-10">
                <div className="flex flex-col justify-center space-y-5">
                    <section>
                        <div className="flex items-center">
                            <Button onClick={() => router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                                <ChevronLeft />
                            </Button>
                            <h1 className="text-xl md:text-2xl font-bold ml-1">
                                Mes compétences<span className='text-[#41806C]'>.</span>
                            </h1>
                        </div>
                        <hr className="border-b-2 border-[#41806C] w-36 my-4" />
                    </section>
                    <div className="competences flex items-center gap-4">
                        {competences.map((competence, index) => (
                            <div key={index} className='w-full'>
                                <CompetenceComponent comp={competence}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
