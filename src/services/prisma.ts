// src/services/experience.ts
import axios from 'axios';
import { ExperienceModel } from '@/models/ExperienceModel';
import { ProjectModel } from '@/models/ProjectModel';
import { ArticleModel } from '@/models/ArticleModel';

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

  async function addProject(projectData: Partial<ProjectModel>) {
    const response = await axios.post('/api/admin/project', projectData);
    return response.data;
  }

  async function geProjectById(id: number){
    const response = await axios.get<ProjectModel>(`/api/admin/project/id/${id}`);
    return response.data;
  }

  async function getProjectByName(name : string){
    const response = await axios.get<ProjectModel>(`/api/admin/project/name/${name}`);
    return response.data;
  }

  async function updateProject(updatedProject: ProjectModel) {
    const response = await axios.put(`/api/admin/project/${updatedProject.id}`, updatedProject);
    return response.data;
  }

  /* Articles */
  async function getArticles(): Promise<ArticleModel[]> {
    const response = await axios.get<ArticleModel[]>('/api/articles');
    return response.data;
  }

  async function addArticle(articleData: Partial<ArticleModel>) {
    const response = await axios.post('/api/admin/article/', articleData);
    return response.data;
  }

  async function getArticleById(id: number): Promise<ArticleModel> {
    const response = await axios.get<ArticleModel>(`/api/admin/article/id/${id}`);
    return response.data;
  }

  async function getArticleByName(name : string){
    const response = await axios.get<ArticleModel>(`/api/admin/article/name/${name}`);
    return response.data;
  }

  async function updateArticle(updatedArticle: ArticleModel) {
    const response = await axios.put(`/api/admin/article/id/${updatedArticle.id}`, updatedArticle);
    return response.data;
  }

  async function incrementArticleViews(id: number) {
    const response = await axios.put(`/api/admin/article/views/${id}`);
    return response.data;
  }
    
  async function incrementArticleLikes(id: number) {
    const response = await axios.put(`/api/admin/article/likes/${id}`);
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
    addProject,
    geProjectById,
    getProjectByName,
    updateProject,
    getArticles,
    addArticle,
    getArticleById,
    getArticleByName,
    updateArticle,
    incrementArticleLikes,
    incrementArticleViews,
    getNumberOf,
  };
}
