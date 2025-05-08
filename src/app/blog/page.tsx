"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePrisma } from '@/services/prisma';
import { ArticleModel } from '@/models/ArticleModel';
import ArticleComponent from '@/components/articles/ArticleComponent';
import { Spinner } from '@/components/ui/spinner';


function BlogPage() {
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
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-10">
        <div className="flex flex-col md:justify-between">
          <section>
              <div className="flex items-center">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                    <ChevronLeft />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold ml-1">
                  Mon blog personnel<span className='text-[#41806C]'>.</span>
                </h1>
              </div>
              <p className='ml-11 text-secondary-foreground'>Voici un endroit où je poste ce que je pense sur beaucoup de sujet.</p>
              <hr className="border-b-2 border-[#41806C] w-36 my-4" />
            </section>  
            <div className="filter">
            <div className="articles">
              {articles.length > 0 ? (
                articles.map(( article )=>(
                  <ArticleComponent articleData={article} key={article.id} />
                ))
              ):(
                <div className="flex items-center justify-center h-full w-full">
                  <Spinner/>
                </div>
              )}
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}

export default BlogPage;