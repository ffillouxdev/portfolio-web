"use client";
import { Globe } from "lucide-react";
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
import { useMediaQuery } from 'react-responsive';
import next_logo from "@public/assets/next.svg";
import Image from "next/image";
import  fillouxFlorian from '@public/assets/filloux-florian.jpg'; 

export default function Home() {
  const experience = useExperience();
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experience.getExperiences();
        setExperiences(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des expériences : ", error);
      }
    };

    fetchExperiences();
  }, [experience]);

  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-10 px-5 md:px-32">
      <div className="max-w-full md:max-w-3xl my-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          {isMobile && (
            <div className="w-1/3 mb-3 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
              <Image
                src={fillouxFlorian}
                alt="Portrait de Filloux Florian, créateur du site et propriétaire du portfolio"
                className="object-cover w-full h-full"
                style={{ height: 'auto', width: 'auto' }}
                loading="lazy"
              />
            </div>
          )}
          <section>
            <h1 className="font-bold text-2xl">Florian FILLOUX</h1>
            <h2 className="mb-2">
              Développeur logiciel basé sur <strong>Lyon et Montpellier, France 🇫🇷</strong>
            </h2>
            <p>Je suis animé par trois grandes passions :</p>
            <ul className="list-decimal ml-6 my-2">
              <li>l&apos;informatique</li>
              <li>l&apos;aéronautique</li>
              <li>l&apos;aérospatiale</li>
            </ul>
          </section>
          {!isMobile && (
            <div className="w-1/6 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
              <Image
                src={fillouxFlorian}
                alt="Portrait de Filloux Florian, créateur du site et propriétaire du portfolio"
                className="object-cover w-full h-full"
                style={{ height: 'auto', width: 'auto' }}
                loading="lazy"
              />
            </div>
          )}
        </div>
        <section className="mt-6">
          <p className="text-color-secondary">
            Pour m&apos;investir pleinement dans mon travail, il est important que les sujets abordés me dépassent.
            C&apos;est pourquoi je cherche à combiner ces domaines afin de donner du sens à ce que je fais au quotidien.
          </p>

          <div className="border-2 p-5 my-5 text-md flex flex-col rounded-md border-gray-100">
            <p className="text-color-secondary">
              À la recherche d&apos;un développeur freelance ? Je propose mes services pour la création de sites
              vitrines, e-commerce et portfolios en Next.js.
            </p>
            <div className="flex items-center justify-between">
              <Image className="my-2" src={next_logo} alt="logo next.js" width={60} height={60} />
              <a
                className="hover:underline flex items-center font-semibold"
                href="https://fleo-web.vercel.app"
                target="_blank"
                >
                voir le site <Globe className="w-4 h-auto ml-1" />
              </a>
            </div>
          </div>
        </section>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Mon parcours</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="font-semibold">BUT informatique - IUT Lyon 1</p>
                    <p>2023 - 2026</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="font-semibold">Lycée Jean Mermoz - Montpellier</p>
                    <p>2019 - 2022</p>
                  </div>
                  <p className="font-thin text-color-secondary">Mention Assez Bien</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>Mes expériences</AccordionTrigger>
            <AccordionContent>
              {experiences.map((exp) => (
                <ExperienceComponent
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
