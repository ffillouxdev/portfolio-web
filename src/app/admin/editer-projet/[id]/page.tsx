"use client";
import { useState, useEffect } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectModel } from '@/models/ProjectModel';

function EditProjectPage() {
  const prisma = usePrisma();
  const router = useRouter();
  const [project, setProject] = useState<ProjectModel | null>(null);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [screens, setScreens] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [whichCase, setWhichCase] = useState<'Studies' | 'Internship' | 'Job'>('Studies');

  const params = useParams();
  const id = parseInt(params.id as string);

  const fetchProject = async () => {
    try {
      const response = await prisma.geProjectById(id);
      setProject(response);
      setTitle(response.title);
      setDate(response.date);
      setDesc(response.desc);
      setLink(response.link);
      setWhichCase(response.whichCase);
      setSkills(Array.isArray(response.skills) ? response.skills.join(', ') : '');
      setScreens(Array.isArray(response.screens) ? response.screens.join(', ') : '');
    } catch (error) {
      console.error('Erreur lors du chargement du projet:', error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      const updatedProject: ProjectModel = {
        ...project,
        title,
        date,
        desc,
        link,
        whichCase,
      };
      await prisma.updateProject(updatedProject);
      router.push('/admin/projets'); 
    }
  };

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-center w-full">
          <p>Chargement...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button onClick={() => router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Éditer le projet</h1>
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
        <Button type="submit" className="w-full">Mettre à jour le projet</Button>
      </form>
    </main>
  );
}

export default EditProjectPage;
