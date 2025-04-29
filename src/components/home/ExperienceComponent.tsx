// src/components/home/ExperienceComponent.tsx
import { ExperienceModel } from "@/models/ExperienceModel";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function ExperienceComponent({
  title = "",
  date = "",
  skills = [],
  desc = "",
  link = "",
  jobTitle = "",
}: ExperienceModel) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="flex items-center justify-between w-full">
        <p className="font-thin text-color-secondary">{jobTitle}</p>
        <p>{date}</p>
      </div>
      <p className="space-x-1 mt-1">
        {skills.length > 0 ? (
          skills.map((skill: string, index: number) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))
        ) : (
          <p>La liste est vide</p>
        )}
      </p>
      <p className="my-5 text-color-secondary">{desc}</p>
      {link && (
        <div className="flex w-full items-center justify-end">
            <a
              className={`${buttonVariants({ variant: "default" })} text-md`}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              >
              Voir plus <PlusIcon className="w-4 h-4" />
            </a>
          </div>
      )}
      <hr className="border-b-2 border-gray-100 w-full my-4" />
    </div>
  );
}
