// src/services/experience.ts
import {prisma} from "@/lib/prisma";
import { ExperienceModel } from '@/models/ExperienceModel';

export function useExperience() {
  async function getExperiences(): Promise<ExperienceModel[]> {
    const experiences = await prisma.experience.findMany();
    const experiencesWithSkills = experiences.map((experience : ExperienceModel) => ({
      ...experience,
      skills: Array.isArray(experience.skills)
        ? experience.skills
        : JSON.parse(experience.skills as string),
    }));
    return experiencesWithSkills;
  }

  async function addExperience(experienceData: Partial<ExperienceModel>) {
    const response = await fetch('/api/admin/experience', {
      method: 'POST',
      body: JSON.stringify(experienceData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }

  return {
    getExperiences,
    addExperience,
  };
}
