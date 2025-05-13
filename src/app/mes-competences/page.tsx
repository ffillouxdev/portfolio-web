"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CompetenceModel } from '@/models/CompetenceModel';
import { ChevronDown, ChevronLeft, CodeXml, MonitorCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CompetenceComponent from '@/components/skills/CompetenceComponent';

export default function MesCompetences() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState("Toutes les compétences");

    const competences: CompetenceModel[] = [
        {
            title: "React.js",
            librairies: ["React DOM", "React Router", "Framer-motion", "Axios",],
            frameworks: ["Next.js"],
            links: [
                "portfolio-template-web.vercel.app/",
                "https://val-illustrations.vercel.app/", 
                "https://www.mona-venture.com/", 
                "https://www.lajuristeindependante.com/", 
                "https://template-first-price-ecom.vercel.app/",
                "https://gloria-vitrine.vercel.app/",

            ],
            desc: "Le premier framework JavaScript que j'ai appris pour créer des interfaces utilisateur. Aujourd'hui, j'utilise fréquemment Next.js pour développer des sites web full-stack, y compris pour les projets de mes clients.",
            nbProjects: 0,
            sourceAvatar : "https://avatars.githubusercontent.com/u/102812?s=200&v=4"
        },
        {
            title: "Vue.js",
            librairies: ["Vue Router 3", "Vite", "Axios"],
            frameworks: ["Vue.js"],
            links: [
                "https://lorembyfleo.vercel.app/",
                "https://ffillouxdev.github.io/my-beautiful-vue-app/"

            ],
            desc: "J'ai appris ce framework JavaScript lors de ma deuxième année de formation. Bien qu'il soit moins flexible que React, Vue.js offre des avantages significatifs en termes de facilité d'intégration et de gestion des états.",
            nbProjects: 0,
            sourceAvatar : "https://avatars.githubusercontent.com/u/6128107?s=200&v=4"   
        },
        {
            title: "Python",
            librairies: ["Tkinter", "Flask", "Nicegui", "Selinium", "BS4"],
            frameworks: ["Flask", "Nicegui", "Django"],
            links: [
                
            ],
            desc: "Langage de programmation polyvalent utilisé pour le développement web, les scripts, les interfaces graphiques, et l'automatisation.",
            nbProjects: 4,
            sourceAvatar: "https://avatars.githubusercontent.com/u/1525981?s=200&v=4"
        }
    ].map(c => ({ ...c, nbProjects: c.links.length }));

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
                    <div className="filters flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center">
                                    {selectedFilter} <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedFilter("Compétences Web")}>
                                    Compétences Web <CodeXml />
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedFilter("Compétences Logiciel")}>
                                    Compétence Logiciel <MonitorCheck />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="competences flex flex-col items-center gap-4">
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
