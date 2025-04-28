import { ExperienceModel } from "@/models/ExperienceModel";
import { Badge } from "@/components/ui/badge";
import {PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"

export default function ExperienceComponent({title = "", date = "", skills = [""], desc = "", link = "", jobTitle = ""}: ExperienceModel){
  return (
    <div className="flex flex-col items-start">
      <h3>{title}</h3>
      <div className="flex items-center justify-between w-full">
        <p>{jobTitle}</p>
        <p>{date}</p>
      </div>
      <p className="space-x-1 mt-1">
        {skills.map((skill, index)=>
        <Badge key={index} variant="outline">{skill}</Badge>
      )}
      </p>
      <p className="my-5">{desc}</p>
      {link && (
        <a
          className={`${buttonVariants({ variant: "default" })} text-md`}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir plus <PlusIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
