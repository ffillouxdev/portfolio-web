export interface ArticleModel{
    id : number;
    title : string;
    categorie: string;
    date : string;
    readTimeMinutes: number;
    likes: number;
    views: number;
    descs : string[];
    comments : string[];
    screens : string[];
}