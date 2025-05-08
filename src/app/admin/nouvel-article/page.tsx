'use client';

import { useState } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, PlusIcon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ArticleModel } from '@/models/ArticleModel';

function NewArticlePage() {
  const prisma = usePrisma();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [date, setDate] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(0);
  const [descArray, setDescArray] = useState<string[]>(['']);
  const [screens, setScreens] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screenFiles, setScreenFiles] = useState<File[]>([]);
  const [likes] = useState(0);
  const [views] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validation des champs requis
    if (
      !title.trim() ||
      !categorie.trim() ||
      !date.trim() ||
      readTimeMinutes <= 0 ||
      descArray.filter((d) => d.trim() !== '').length === 0 ||
      screens.length === 0
    ) {
      alert('Veuillez remplir tous les champs requis avant de soumettre.');
      return;
    }
  
    try {
      await prisma.addArticle({
        title,
        categorie,
        date,
        readTimeMinutes,
        likes,
        views,
        descs: descArray.filter((d) => d.trim() !== ''),
        screens,
        comments: [],
      } as Partial<ArticleModel>);
      router.push('/blog');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
    }
  };
  

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileNames = Array.from(files).map((file) => {
      console.log(file)
      const fileName = file.name; 
      return fileName;
    });
    setScreens((prev) => [...prev, ...fileNames]);
    setScreenFiles(Array.from(files));

    if (!files || files.length === 0) return;
  };

  const handleDescChange = (index: number, value: string) => {
    const updated = [...descArray];
    updated[index] = value;
    setDescArray(updated);
  };

  const addDescription = () => {
    setDescArray([...descArray, '']);
  };

  const removeDescription = (index: number) => {
    setDescArray((prev) => prev.filter((_, i) => i !== index));
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
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
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
          <Label>Descriptions</Label>
          <div className="space-y-4">
            {descArray.map((desc, index) => (
              <div key={index} className="relative">
                <Textarea
                  value={desc}
                  onChange={(e) => handleDescChange(index, e.target.value)}
                  placeholder={`Description ${index + 1}`}
                  className="pr-10"
                />
                <Button
                  type="button"
                  onClick={() => removeDescription(index)}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addDescription} className="mt-2">
            + Ajouter une description
          </Button>
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
            <p className="text-sm text-gray-500">
              Fichiers sélectionnés : {screens.join(', ')}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Ajouter l&apos;article <PlusIcon/>
        </Button>
      </form>
    </main>
  );
}

export default NewArticlePage;
