import React from 'react'
import { Card } from '../ui/card'
import { Edit2Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image';
import { ArticleModel } from '@/models/ArticleModel';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { sanitize } from '@/utils/functions';
import { Badge } from '../ui/badge';

interface ArticleModelProps{
    articleData : ArticleModel;
}

export default function ArticleAdminComponent({articleData} : ArticleModelProps) {
    const screenURL = `/assets/article/${articleData.screens[1]}`;
    const router = useRouter();
    
    function handleArticleEdit(){
        router.push(`/admin/articles/editer/${sanitize(articleData.title)}`)
    }

    return (
        <Card className="article flex flex-col p-3 overflow-hidden">
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
          <Button onClick={handleArticleEdit}>Editer <Edit2Icon/></Button>
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-color-secondary">Temps de lecture <strong className='text-black'>{articleData.readTimeMinutes}</strong> minutes.</p>
            <p className='font-thin'>
              Publié le <span className='font-semibold underline'>{articleData.date}</span>
            </p>
          </div>
        </Card>
      )
    }