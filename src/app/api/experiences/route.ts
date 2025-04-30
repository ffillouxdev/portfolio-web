import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Erreur lors de la récupération des expériences :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
