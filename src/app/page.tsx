"use client";
import { ChevronDown, Github, Info, Linkedin, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ExperienceComponent from "@/components/home/ExperienceComponent";
import { useEffect, useState } from "react";
import { useExperience } from "@/services/experience";
import { ExperienceModel } from "@/models/ExperienceModel";
import { Button } from "@/components/ui/button";


export default function Home() {
  const experience = useExperience();
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);

  useEffect(()=>{
    const fetchExperiences = async () =>{
      try {
        const response = await experience.getExperiences();
        setExperiences(response);
      } catch (error ) {
        console.error("Erreur lors de la récupération des expériences : ", error);
      }
    };

    fetchExperiences();
    if (experiences.length === 0) {
      setExperiences([
        {
          title: "Développement logiciel / DevOps",
          date: "avril - juin 2025",
          skills: ["Python", "Git", "Docker"],
          desc: "Lors de ce stage, j'ai travaillé sur le développement d'une application de gestion de tâches avec des technologies modernes comme Python et Docker. Ce projet m'a permis d'acquérir une expérience pratique dans le domaine du développement logiciel et des pratiques DevOps.",
          link: "https://github.com/ffillouxdev/tactic-todo",
          jobTitle: "Stage en développement Logiciel",
        }
      ]);
    }
    
  },[])
  return (
   <main className="h-[90vh] flex flex-col items-center justify-center px-32">
    <section className="max-w-3xl">
      <h1 className="font-bold text-2xl">Florian FILLOUX</h1>
      <h2 className="mb-2">Développeur logiciel basé sur <strong>Lyon et Montpellier, France 🇫🇷</strong></h2>
      <p>Je suis animé par trois grandes passions :</p>
      <ul className="list-decimal ml-6 my-2">
        <li>l&apos;informatique</li>
        <li>l&apos;aéronautique</li>
        <li>l&apos;aérospatiale</li>
      </ul>
      <p>Pour m&apos;investir pleinement dans mon travail, il est important que les sujets abordés me dépassent. C&apos;est pourquoi je cherche à combiner ces domaines afin de donner du sens à ce que je fais au quotidien.</p>
      <div className="border-2 p-5 my-5 rounded-md border-gray-100">

      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Mon parcours</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <p>BUT informatique - IUT Lyon 1</p>
                <p>2023 - 2026</p>
              </div>
              <div className="flex justify-between">
                <p>Lycée Jean Mermoz - Montpellier</p>
                <p>2019 - 2022</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Mes expériences</AccordionTrigger>
          <AccordionContent>
          {experiences.map((exp, index) => (
            <ExperienceComponent
              key={index}
              title={exp.title}
              date={exp.date}
              skills={exp.skills}
              desc={exp.desc}
              link={exp.link}
              jobTitle={exp.jobTitle}
            />
          ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
    <button className="bottom-button rounded-md absolute bottom-0 animation hover:scale-95">
    <ChevronDown className="w-14 h-auto"/>
    </button>
    <aside className="social-medias-grp flex flex-col items-start space-y-5 absolute left-5">
        <Button onClick={() => window.open("https://www.linkedin.com/in/florian-filloux-40b4b9243/", "_blank")} className="bg-transparent hover:scale-95 shadow-none text-black text-base  hover:text-white"><Linkedin/></Button>
        <Button onClick={() => window.open("https://github.com/ffillouxdev", "_blank")} className="bg-transparent hover:scale-95 shadow-none text-black text-base  hover:text-white"><Github/></Button>
        <Button onClick={() => window.location.href = "mailto:fillouxflorian56@gmail.com"} className="bg-transparent hover:scale-95 shadow-none text-black text-base  hover:text-white"><Mail/></Button> 
        <Button className="bg-transparent hover:scale-95 shadow-none text-black text-base  hover:text-white"><Info/></Button>
      </aside>
   </main>
  );
}
