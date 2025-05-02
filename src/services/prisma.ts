// src/services/experience.ts
import axios from 'axios';
import { ExperienceModel } from '@/models/ExperienceModel';
import { ProjectModel } from '@/models/ProjectModel';

export function usePrisma() {
  /* Expériences */
  async function getExperiences(): Promise<ExperienceModel[]> {
    const response = await axios.get<ExperienceModel[]>('/api/experiences');
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

  /*Projets */
  async function getProjects(): Promise<ProjectModel[]> {
    const response = await axios.get<ProjectModel[]>('/api/projects');
    return response.data;
  }

  async function geProjectById(id: number){
    const response = await axios.get<ProjectModel>(`/api/admin/project/${id}`);
    return response.data;
  }

  async function updateProject(updatedProject: ProjectModel) {
    const response = await axios.put(`/api/admin/project/${updatedProject.id}`, updatedProject);
    return response.data;
  }

  /* Utils */
  async function getNumberOf(filter: string) : Promise<number> {
    const response = await axios.get(`/api/admin/${filter}`);
    return response.data.number;
  }

  return {
    getExperiences,
    addExperience,
    getExperienceById,
    updateExperience,
    getProjects,
    geProjectById,
    updateProject,
    getNumberOf,
  };
}
