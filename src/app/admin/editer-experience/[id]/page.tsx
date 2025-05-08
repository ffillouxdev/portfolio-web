"use client";
import { useState, useEffect } from 'react';
import { usePrisma } from '@/services/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ExperienceModel } from '@/models/ExperienceModel';
import { Spinner } from '@/components/ui/spinner';

function EditExpPage() {
  const prisma = usePrisma();
  const router = useRouter();
  const [experience, setExperience] = useState<ExperienceModel | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [desc, setDesc] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [link, setLink] = useState('');

  const param = parseInt(window.location.pathname.split('/').pop() || '');

  const fetchExperience = async () => {
    try {
      const response = await prisma.getExperienceById(param);
      setExperience(response);
      setTitle(response.title);
      setDate(response.date);
      setSkills(response.skills.join(', '));  
      setDesc(response.desc);
      setJobTitle(response.jobTitle);
      setLink(response.link || '');
    } catch (error) {
      console.error('Error fetching experience:', error);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, [param]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (experience) {
      await prisma.updateExperience({
        ...experience,
        title,
        date,
        skills: skills.split(',').map(skill => skill.trim()),
        desc,
        jobTitle,
        link,
      });
    }
    router.push('/admin/experiences')
  };

  if (!experience) {
    return (
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-center w-full">
          <Spinner/>
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
        <h1 className="text-2xl font-bold">Éditer l&apos;expérience</h1>
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
        <Button type="submit" className="w-full">Update Experience</Button>
      </form>
    </main>
  );
}

export default EditExpPage;
