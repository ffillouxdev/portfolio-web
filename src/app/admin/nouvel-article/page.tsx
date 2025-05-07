'use client';

import { useState } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ArticleModel } from '@/models/ArticleModel';

function NewArticlePage() {
  const prisma = usePrisma();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [date, setDate] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(0);
  const [desc, setDesc] = useState('');
  const [screens, setScreens] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [descArray, setDescArray] = useState<string[]>([]);
  const [screenFiles, setScreenFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await prisma.addArticle({
        title,
        categorie,
        date,
        readTimeMinutes,
        likes,
        views,
        descs: descArray,
        screens,
        comments: [],
      } as Partial<ArticleModel>);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'article:', error);
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileNames = Array.from(files).map((file) => file.name.split('.')[0]);  
    setScreens((prev) => [...prev, ...fileNames]);
    setScreenFiles(Array.from(files));
  };

  const handleDescChange = (index: number, value: string) => {
    const updatedDescs = [...descArray];
    updatedDescs[index] = value;
    setDescArray(updatedDescs);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => router.back()}
          variant="default"
          className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Nouveau article</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 border-2 border-gray-100 p-6 rounded-md">
        <div className="space-y-2">
          <Label>Titre</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Catégorie</Label>
          <Input value={categorie} onChange={(e) => setCategorie(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Temps de lecture (en minutes)</Label>
          <Input
            type="number"
            value={readTimeMinutes}
            onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onBlur={() => {
              if (desc.trim()) {
                setDescArray((prev) => [...prev, desc.trim()]);
                setDesc('');
              }
            }}
          />
          <div className="space-y-2 mt-4">
            {descArray.map((descItem, index) => (
              <div key={index}>
                <Textarea
                  value={descItem}
                  onChange={(e) => handleDescChange(index, e.target.value)}
                />
                {index < descArray.length - 1 && <hr className="my-4 border-gray-200" />}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Images (fichiers sélectionnés)</Label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImage}
            className="w-full border border-gray-200 p-2 rounded-md"
          />
          {screens.length > 0 && (
            <p className="text-sm text-gray-500">Fichiers sélectionnés : {screens.join(', ')}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Ajouter l'article
        </Button>
      </form>
    </main>
  );
}

export default NewArticlePage;
