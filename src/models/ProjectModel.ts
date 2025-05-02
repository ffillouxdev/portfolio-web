export interface ProjectModel {
    id: number;
    title : string;
    desc : string;
    link: string;
    screens: String[];
    skills: String[];
    date : string;
    whichCase : 'Studies' | 'Internship' | 'Job';
}