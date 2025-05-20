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
            title: "TypeScript / JavaScript",
            librairies: [
                "React DOM",
                "React Router",
                "Framer-motion",
                "Axios",
                "Vue Router 3",
                "Vite"
            ],
            frameworks: ["React.js", "Next.js", "Vue.js"],
            links: [
                "https://ffillouxdev.github.io/my-beautiful-vue-app/",
                "https://www.mona-venture.com/", 
                "https://www.lajuristeindependante.com/", 
                "https://portfolio-template-web.vercel.app/",
                "https://val-illustrations.vercel.app/", 
                "https://template-first-price-ecom.vercel.app/",
                "https://gloria-vitrine.vercel.app/",
                "https://lorembyfleo.vercel.app/"
            ],
            desc: "Compétences avancées en développement frontend avec JavaScript et TypeScript. Utilisation de bibliothèques modernes comme React et Vue.js, ainsi que de frameworks tels que Next.js. Création d'interfaces utilisateur dynamiques, développement full-stack avec Next.js, et intégration d'API avec Axios. Expérience sur plusieurs projets professionnels et personnels.",
            nbProjects: 0,
            sourceAvatar: "https://imgs.search.brave.com/5u5Ytkzx-pj0RezqKpBXA4zljFotioxyU87P5DPkBaI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzRjL1R5/cGVzY3JpcHRfbG9n/b18yMDIwLnN2Zy8y/NTBweC1UeXBlc2Ny/aXB0X2xvZ29fMjAy/MC5zdmcucG5n"
        },
        {
            title: "Java",
            librairies: [
                "Swing",
                "JDBC"
            ],
            frameworks: [],
            links: [
                "https://github.com/ffillouxdev/SAE_JAVA",
                "https://github.com/ffillouxdev/my-beautiful-java-app"
            ],
            desc: "Application de compétences en mathématiques avec Java, apprentissage des design patterns et mise en œuvre de tests unitaires.",
            nbProjects: 0,
            sourceAvatar: "https://brandslogos.com/wp-content/uploads/images/large/java-logo-1.png"
        },
        {
            title: "Python",
            librairies: ["Tkinter", "Flask", "Nicegui", "Subprocess", "Selinium", "BS4", "Pyautogui"],
            frameworks: ["Flask", "Nicegui", "Django"],
            links: [
                ""
            ],
            desc: "Langage de programmation polyvalent utilisé pour le développement web, les scripts, les interfaces graphiques, et l'automatisation.",
            nbProjects: 4,
            sourceAvatar: "https://avatars.githubusercontent.com/u/1525981?s=200&v=4"
        },
        {
        title: "Base de données",
        librairies: ["Supabase", "Prisma"],  
        frameworks: [],
        links: [
            "https://www.sqlite.org/",
            "https://www.mongodb.com/",
            "https://www.mysql.com/",
            "https://supabase.com/",
            "https://www.prisma.io/" 
        ],
        desc: "Maîtrise de plusieurs systèmes de gestion de bases de données relationnelles et NoSQL : SQLite, MongoDB, MySQL, PL/SQL. Utilisation d'outils comme SQLDeveloper, SQLiteStudio, MongoCompass, Supabase et Prisma pour la gestion et l'exploration de données avec une approche moderne et type-safe.",
        nbProjects: 0,
        sourceAvatar: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sql/sql.png"
        },
        {
            title: "Outils",
            librairies: ["Figma", "Power AMC"],
            frameworks: [], 
            links: [
                "https://git-scm.com/",
                "https://github.com/ffillouxdev",
                "https://forge.univ-lyon1.fr/p2203403",
            ],
            desc: "Utilisation d'outils variés pour le développement logiciel. Maîtrise de la gestion de version avec Git via GitHub et GitLab. Conception d'interfaces avec Figma. Modélisation de bases de données et d'architectures logicielles via UML et Power AMC.",
            nbProjects: 0, 
            sourceAvatar: "https://images.icon-icons.com/827/PNG/512/tools_icon-icons.com_66544.png"  
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
