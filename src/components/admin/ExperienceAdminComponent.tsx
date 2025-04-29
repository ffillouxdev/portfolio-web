// src/components/home/ExperienceComponent.tsx
import { ExperienceModel } from "@/models/ExperienceModel";
import { Badge } from "@/components/ui/badge";
import { Edit2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface ExperienceComponentProps extends ExperienceModel {
  isAdmin?: boolean;
}

export default function ExperienceAdminComponent({
  id=1,
  title = "",
  date = "",
  skills = [],
  desc = "",
  jobTitle = "",
  isAdmin = false,
}: ExperienceComponentProps) {
  return(
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
        <div className="flex w-full items-center justify-end space-x-2">
            <Link href={`/admin/editer-experience/${id}`} className={`${buttonVariants({ variant: "outline" })} ${!isAdmin ? 'hidden' : ''} max-w-32 md:max-w-full mt-2 md:mt-0`}>
                Editer <Edit2 />
          </Link>
        </div>
      <hr className="border-b-2 border-gray-100 w-full my-4" />
    </div>
  );
}
