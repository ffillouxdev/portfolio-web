"use client";
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, LogOut, PlusIcon, Settings } from 'lucide-react';
import { AdminFieldModel } from '@/models/AdminFieldModel';
import { usePrisma } from '@/services/prisma';


const AdminField = ({ title = "", link_base = "", link_new= "", desc = "", nombre = 0 }: AdminFieldModel) => {
  const router = useRouter();

  return (
    <div className="shadow rounded-lg border px-4 mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}{nombre > 1 ? 's' : ''} ({nombre} disponible{nombre > 1 ? 's' : ''})</AccordionTrigger>
          <AccordionContent>
            <p className="text-color-secondary mb-2 md:mb-0">{desc}</p>
            <div className="flex justify-end items-center space-x-2">
              <Button variant={"default"} onClick={()=> router.push(link_base)}>Voir tout <Box/></Button>
              <Button variant={"outline"} onClick={()=> router.push(link_new)}>Ajouter <PlusIcon/></Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

function AdminPage() {
  const prisma = usePrisma();
  const router = useRouter();
  const supabase = createClientComponentClient()
  const [counts, setCounts] = useState({
    experiences: 0,
    projets: 0,
    compétences: 0,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/connexion')  
  }

  useEffect(() => {
    async function fetchCounts() {
      const experiences = await prisma.getNumberOf('experiences');
      const projets = await prisma.getNumberOf('projets');
      const compétences = await prisma.getNumberOf('competences');
      setCounts({ experiences, projets, compétences });
    }

    fetchCounts();
  }, []);

  const adminFieldsTab: AdminFieldModel[] = [
    { title: 'Expérience', link_base: '/admin/experiences',link_new: '/admin/nouvelle-experience', desc: 'Gérez les expériences professionnelles affichées sur mon portfolio.', nombre: counts.experiences},
    { title: 'Projet', link_base: '/admin/projets', link_new: 'admin/nouveau-projet', desc: "Ajoutez ou modifiez les projets que j'ai réalisé.", nombre:  counts.projets},
    { title: 'Compétence', link_base: '/admin/compétences', link_new: '/admin/nouvelle-compétence', desc: 'Mettez à jour la liste de mes compétences techniques.', nombre:  counts.compétences }
  ];

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex md:items-center flex-col md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold flex items-center">Admin Dashboard <Settings className='ml-1'/></h1>
        <Button onClick={handleLogout} variant={'destructive'} className='max-w-32 md:maw-w-full mt-2 md:mt-0'>Déconnexion <LogOut/></Button>
      </div>

      <section className="space-y-4">
        {adminFieldsTab.map((field, idx) => (
          <AdminField key={idx} {...field} />
        ))}
      </section>
    </main>
  );
}

export default AdminPage;
