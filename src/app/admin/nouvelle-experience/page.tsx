"use client";

import { useState } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NewExpPage = () => {
  const prisma = usePrisma();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [desc, setDesc] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification de tous les champs
    if (
      !title.trim() ||
      !date.trim() ||
      !skills.trim() ||
      !desc.trim() ||
      !jobTitle.trim() ||
      !link.trim()
    ) {
      alert('Veuillez remplir tous les champs avant de soumettre.');
      return;
    }

    const formattedSkills = skills.split(',').map(skill => skill.trim());

    try {
      await prisma.addExperience({
        title,
        date,
        skills: formattedSkills,
        desc,
        jobTitle,
        link,
      });

      // Réinitialiser le formulaire
      setTitle('');
      setDate('');
      setSkills('');
      setDesc('');
      setJobTitle('');
      setLink('');

      router.push('/');
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’expérience:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button onClick={() => router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Nouvelle expérience</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 border-2 border-gray-100 p-6 rounded-md">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Skills (separated by commas)</Label>
          <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Link</Label>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">
          Add Experience <PlusIcon />
        </Button>
      </form>
    </main>
  );
};

export default NewExpPage;
