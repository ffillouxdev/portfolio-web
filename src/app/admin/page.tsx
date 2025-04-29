// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useExperience } from '@/services/experience';
import { ExperienceModel } from '@/models/ExperienceModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const AdminPage = () => {
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
  const experience = useExperience();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [desc, setDesc] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await experience.getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await experience.addExperience({
      title,
      date,
      skills: skills.split(',').map(skill => skill.trim()), 
      desc,
      jobTitle,
      link,
    });
    fetchExperiences();  
    setTitle('');
    setDate('');
    setSkills('');
    setDesc('');
    setJobTitle('');
    setLink('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <Card>
        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full">Add Experience</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Experiences</h2>
        <ul className="space-y-2">
          {experiences.map((exp) => (
            <li key={exp.id} className="border p-4 rounded-lg hover:bg-gray-100 transition">
              <Link href={`/admin/edit/${exp.id}`}>
                <div className="font-semibold text-lg cursor-pointer">{exp.title}</div>
              </Link>
              <p className="text-gray-500">{exp.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
