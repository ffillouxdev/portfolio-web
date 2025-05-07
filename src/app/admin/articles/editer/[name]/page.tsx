"use client"
import { Button } from '@/components/ui/button';
import { ArticleModel } from '@/models/ArticleModel';
import { usePrisma } from '@/services/prisma';
import { capitalizeFirstLetter } from '@/utils/functions';
import { ChevronLeft, SaveIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function EditArticlePage() {
  const prisma = usePrisma();
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleModel>();
  const [editableDescs, setEditableDescs] = useState<string[]>([]);
  const [screens, setScreens] = useState<string[]>([]);
  const [categorie, setCategorie] = useState('');
  const [date, setDate] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const rawName = params.name;
  const name = typeof rawName === 'string' ? rawName : Array.isArray(rawName) ? rawName[0] : '';
  const formattedName = capitalizeFirstLetter(name.split('-').join(' '));

  const fetchArticleData = async () => {
    try {
      const response = await prisma.getArticleByName(name as string);
      setArticle(response);
      setEditableDescs(response?.descs || []);
      setScreens(response?.screens || []);
      setCategorie(response?.categorie || '');
      setDate(response?.date || '');
      setReadTimeMinutes(response?.readTimeMinutes || 0);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article`, error);
    }
  };

  const handleDescChange = (index: number, value: string) => {
    setEditableDescs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveImage = (index: number) => {
    setScreens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files).map((file) => {
        console.log(file)
        const fileName = file.name; 
        return fileName;
    });
  
    setScreens((prev) => [...prev, ...fileArray]);
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;
    setIsSaving(true);
    try {
      const updatedArticle: ArticleModel = {
        ...article,
        descs: editableDescs,
        screens,
        categorie,
        date,
        readTimeMinutes,
      };
      await prisma.updateArticle(updatedArticle);
      router.push('/blog');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5">
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-10">
        <div className="flex flex-col justify-center space-y-5">
          <section>
            <div className="flex items-center">
              <Button
                onClick={() => router.back()}
                variant="default"
                className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
              >
                <ChevronLeft />
              </Button>
              <h1 className="text-xl md:text-2xl font-bold ml-1">
                {formattedName}
                <span className="text-[#41806C]">.</span>
              </h1>
            </div>
            <hr className="border-b-2 border-[#41806C] w-36 my-4" />
          </section>

          <div className="flex md:flex-row md:justify-between md:items-center">
            <p className="text-color-secondary">
              Temps de lecture <strong className="text-black">{article.readTimeMinutes}</strong> minutes.
            </p>
            <p className="font-thin">
              Publié le <span className="font-semibold underline">{article.date}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie :</label>
              <input
                type="text"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date :</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Temps de lecture (min) :</label>
              <input
                type="number"
                value={readTimeMinutes}
                onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="articles-desc1 space-y-4 mt-4">
            {editableDescs.map((desc, index) => (
              <React.Fragment key={index}>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleDescChange(index, e.currentTarget.textContent || '')}
                  className="focus:outline-none"
                >
                  {desc}
                </p>
                <hr className="border-b-2 border-gray-100 w-full my-4" />
              </React.Fragment>
            ))}
          </div>
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ajouter des images :</label>
            <input
              type="file"
              className="border rounded p-1"
              multiple
              accept="image/*"
              onChange={handleAddImage}
            />
          </div>
          <div className="flex overflow-x-auto space-x-4 py-4">
            {screens.map((screen, index) => (
              <div key={index} className="relative min-w-[300px] h-[200px] border rounded-lg overflow-hidden">
                <Image
                  src={screen.startsWith('/assets/article') ? screen : `/assets/article/${screen}`}
                  alt={`Écran ${index}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={handleSubmit} disabled={isSaving} className="w-full">
              {isSaving ? 'Sauvegarde...' : 'Enregistrer les modifications'} <SaveIcon />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
