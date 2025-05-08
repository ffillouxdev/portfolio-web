import { ArticleModel } from '@/models/ArticleModel';
import React from 'react'
import { Card } from '../ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import { slugify } from '@/utils/functions';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface ArticleModelProps{
    articleData : ArticleModel;
}

function ArticleComponent({articleData} : ArticleModelProps) {
  const router = useRouter();
  const screenURL = `/assets/article/${articleData.screens[1]}`;

  const handleRedirectionToArticleClick = () =>{
    router.push(`blog/article/${slugify(articleData.title)}`)
  }

  return (
    <Card onClick={handleRedirectionToArticleClick} className="article my-5 flex flex-col p-3 overflow-hidden hover:scale-95 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <h3 className="font-bold text-md">{articleData.title}</h3>
          <Badge>{articleData.categorie}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/117982823?v=4" alt="Avatar de l'auteur" />
              <AvatarFallback>FF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="article-screens h-full flex items-center justify-center w-full">
        { screenURL ? (
          <Image
            src={screenURL}
            alt={`Écran ${articleData.id} - ${articleData.title}`}
            width={800}
            height={600}
            className="object-cover w-full rounded-lg max-w-[800px] h-full"
            priority={articleData.id === 1}
          />
        ) : (
          <p>Il n&apos;y a aucune image.</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="text-color-secondary">Temps de lecture <strong className='text-black'>{articleData.readTimeMinutes}</strong> minutes.</p>
        <p className='font-thin'>
          Publié le <span className='font-semibold underline'>{articleData.date}</span>
        </p>
      </div>
    </Card>
  )
}

export default ArticleComponent;
