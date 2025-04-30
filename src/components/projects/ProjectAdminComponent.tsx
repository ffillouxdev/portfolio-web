import { ProjectModel } from '@/models/ProjectModel';
import React from 'react';

interface Props {
    project: ProjectModel;
  }
export default function ProjectAdminComponent({project} :  Props) {
  return (
    <div className='project'>
        <p>{project.title}</p>
        <p>{project.desc}</p>
        <a href={project.link}>Voir le site</a>
    </div>  
  )
}
