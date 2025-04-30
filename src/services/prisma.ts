// src/services/experience.ts
import axios from 'axios';
import { ExperienceModel } from '@/models/ExperienceModel';

export function usePrisma() {
  async function getExperiences(): Promise<ExperienceModel[]> {
    const response = await axios.get<ExperienceModel[]>('/api/experience');
    return response.data;
  }

  async function addExperience(experienceData: Partial<ExperienceModel>) {
    const response = await axios.post('/api/admin/experience', experienceData);
    return response.data;
  }

  async function getExperienceById(id: number){
    const response = await axios.get<ExperienceModel>(`/api/admin/experience/${id}`);
    return response.data;
  }

  async function updateExperience(updatedExperience: ExperienceModel) {
    const response = await axios.put(`/api/admin/experience/${updatedExperience.id}`, updatedExperience);
    return response.data;
  }
  

  async function getNumberOf(filter: string) : Promise<number> {
    const response = await axios.get(`/api/admin/${filter}`);
    return response.data.number;
  }

  return {
    getExperiences,
    addExperience,
    getNumberOf,
    getExperienceById,
    updateExperience,
  };
}
