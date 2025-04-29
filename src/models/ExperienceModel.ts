// src/models/ExperienceModel.ts  
export interface ExperienceModel {
  id: number;
  title: string;
  date: string;
  skills: string[];
  desc: string;
  link?: string | null; 
  jobTitle: string;
}