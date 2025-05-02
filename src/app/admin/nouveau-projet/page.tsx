'use client';

import { useState } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProjectModel } from '@/models/ProjectModel';

function NewProjectPage() {
  const prisma = usePrisma();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [screens, setScreens] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [whichCase, setWhichCase] = useState<'Studies' | 'Internship' | 'Job'>('Studies');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await prisma.addProject({
        title,
        date,
        skills: skills.split(',').map(skill => skill.trim()), 
        screens: screens.split(',').map((s) => s.trim()),
        desc,
        link,
        whichCase,
      } as Partial<ProjectModel>);
      router.push('/mes-projets');
    } catch (error) {
      console.error('Erreur lors de l’ajout du projet:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button onClick={() => router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Nouveau projet</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 border-2 border-gray-100 p-6 rounded-md">
        <div className="space-y-2">
          <Label>Titre</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Compétences (séparées par des virgules)</Label>
          <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Images (chemins séparés par des virgules)</Label>
          <Input value={screens} onChange={(e) => setScreens(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Lien</Label>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Catégorie</Label>
          <select
            className="w-full border border-gray-200 p-2 rounded-md"
            value={whichCase}
            onChange={(e) => setWhichCase(e.target.value as 'Studies' | 'Internship' | 'Job')}
          >
            <option value="Studies">Études</option>
            <option value="Internship">Stage</option>
            <option value="Job">Travail</option>
          </select>
        </div>
        <Button type="submit" className="w-full">Ajouter le projet</Button>
      </form>
    </main>
  );
}

export default NewProjectPage;
