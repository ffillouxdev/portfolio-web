import { axiosInstance } from '@/utils/axiosInstance';
import { ExperienceModel } from '../models/ExperienceModel';

export function useExperience() {
  async function getExperiences(): Promise<ExperienceModel[]> {
    const response = await axiosInstance.get<ExperienceModel[]>('/experiences');  
    return response.data;
  }

  return {
    getExperiences
  };
}