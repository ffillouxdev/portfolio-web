export interface ArticleModel{
    title : string;
    categorie: string;
    date : string;
    readTimeMinutes: number;
    likes?: number;
    views?: number;
    comments? : String[];
}