import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des expériences :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
