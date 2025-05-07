// src/app/api/admin/[filter]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const filter = request.nextUrl.pathname.split('/').pop();

  if (!filter) {
    return NextResponse.json({ error: 'Aucun filtre fourni.' }, { status: 400 });
  }

  try {
    let count = 0;

    switch (filter) {
      case 'experiences':
        count = await prisma.experience.count();
        break;
      case 'projets':
        count = await prisma.project.count();
        break;
      case 'competences':
        count = 0; // await prisma.competence.count();
        break;
      case 'articles':
        count = await prisma.article.count();
        break;
      default:
        return NextResponse.json({ error: `Filtre non reconnu : ${filter}` }, { status: 400 });
    }

    return NextResponse.json({ number: count });
  } catch (error) {
    console.error('Erreur Prisma:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des données.' }, { status: 500 });
  }
}