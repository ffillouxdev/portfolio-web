export interface ProjectModel {
    id: number;
    title : string;
    desc : string;
    link: string;
    screens: JSON;
    skills: JSON;
    date : string;
    whichCase : 'Studies' | 'Internship' | 'Job';
}