"use client"
import { Button } from '@/components/ui/button';
import { ArticleModel } from '@/models/ArticleModel';
import { usePrisma } from '@/services/prisma';
import { capitalizeFirstLetter } from '@/utils/functions';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SpecificArticlePage() {
    const prisma = usePrisma();
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<ArticleModel>();
    const rawName = params.name;
    const name = typeof rawName === 'string' ? rawName : Array.isArray(rawName) ? rawName[0] : '';
    const formattedName = capitalizeFirstLetter(name.split('-').join(' '));
    const screenURL1 = article?.screens?.[0]
    ? `/assets/article/${article.screens[0]}`
    : '';
    const screenURL2 = article?.screens?.[1]
    ? `/assets/article/${article.screens[1]}`
    : '';
  
    function spaceDescriptionAndParagraph() {
    
    }

    const fetchArticleData = async () => {
        try {
            const response = await prisma.getArticleByName(name as string);
            setArticle(response);
        } catch (error) {
            console.error(`Erreur lors de la récuparation de`)
        }
    }

    useEffect(()=>{
        fetchArticleData();
    },[])

    if(!article){
        return(
            <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
                <div className="w-full md:w-3xl my-10">
                    <div className="flex flex-col justify-center space-y-5">
                        <section>
                            <div className="flex items-center">
                                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                                    <ChevronLeft />
                                </Button>
                                <h1 className="text-xl md:text-2xl font-bold ml-1">
                                    {formattedName}<span className='text-[#41806C]'>.</span>
                                </h1>
                            </div>
                            <hr className="border-b-2 border-[#41806C] w-36 my-4" />
                        </section>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
            <div className="w-full md:w-3xl my-10">
                <div className="flex flex-col justify-center space-y-5">
                    <section>
                        <div className="flex items-center">
                            <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                                <ChevronLeft />
                            </Button>
                            <h1 className="text-xl md:text-2xl font-bold ml-1">
                                {formattedName}<span className='text-[#41806C]'>.</span>
                            </h1>
                        </div>
                        <hr className="border-b-2 border-[#41806C] w-36 my-4" />
                    </section>
                    <Button variant={'link'}>

                    </Button>
                    <div className="flex md:flex-row md:justify-between md:items-center">
                        <p className="text-color-secondary">Temps de lecture <strong className='text-black'>{article.readTimeMinutes}</strong> minutes.</p>
                        <p className='font-thin'>Publié le <span className='font-semibold underline'>{article.date}</span></p>
                    </div>
                    <div className="articles-desc1 space-y-4">
                    {Array.isArray(article.descs) &&
                        article.descs.map((desc, index) => (
                            <p key={index} className="text-color-secondary">{desc}</p>
                        )
                    )}
                    </div>
                    { screenURL1 ? (
                        <Image
                            src={screenURL1}
                            alt={`Écran ${article.id} - ${article.title}`}
                            width={800}
                            height={600}
                            className="object-cover w-full rounded-lg max-w-[500px] mx-auto h-full"
                            priority={article.id === 1}
                        />
                    ) : (
                      <p>Il n'y a aucune image.</p>
                    )}
                    <div className="articles-desc2 space-y-4">
                        {Array.isArray(article.descs) &&
                            article.descs.map((desc, index) => (
                                <p key={index} className="text-color-secondary">{desc}</p>
                            )
                        )}
                    </div>
                    { screenURL2 ? (
                        <Image
                            src={screenURL2}
                            alt={`Écran ${article.id} - ${article.title}`}
                            width={800}
                            height={600}
                            className="object-cover w-full rounded-lg max-w-[800px] mx-auto h-full py-12"
                            priority={article.id === 1}
                        />
                    ) : (
                      <p>Il n'y a aucune image.</p>
                    )}
                </div>
            </div>
        </main>
    )
}
