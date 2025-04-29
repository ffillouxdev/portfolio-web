// src/services/experience.ts
import axios from 'axios';
import { ExperienceModel } from '@/models/ExperienceModel';

export function useExperience() {
  async function getExperiences(): Promise<ExperienceModel[]> {
    const res = await axios.get<ExperienceModel[]>('/api/experience');
    return res.data;
  }

  async function addExperience(experienceData: Partial<ExperienceModel>) {
    const res = await axios.post('/api/admin/experience', experienceData);
    return res.data;
  }

  return {
    getExperiences,
    addExperience,
  };
}
