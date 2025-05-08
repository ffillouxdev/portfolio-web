"use client";
import ArticleAdminComponent from '@/components/admin/ArticleAdminComponent'
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArticleModel } from '@/models/ArticleModel';
import { usePrisma } from '@/services/prisma';
import { Bubbles, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function AdminArticlesPage() {
    const router = useRouter();
    const prisma = usePrisma();
    const [articles, setArticles] = useState<ArticleModel[]>([]);
    
    const fetchArticles = async () => {
        try {
            const response = await prisma.getArticles();
            setArticles(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
        }
    }
    
    useEffect(()=>{
        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex md:items-center flex-col md:flex-row md:justify-between">
            <div className="flex items-center space-x-4">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                    <ChevronLeft />
                </Button>
                <h1 className="text-2xl font-bold flex items-center">Articles <Bubbles className='ml-2'/></h1>
            </div>
        </div>
        <section className="space-y-4">
            <div className="articles">
                {articles.length > 0 ? (
                    articles.map(( article )=>(
                    <ArticleAdminComponent articleData={article} key={article.id} />
                    ))
                ):(
                    <div className="flex items-center justify-center h-full w-full">
                        <Spinner/>
                    </div>
                )}
          </div>
        </section>
    </main>
  )
}
