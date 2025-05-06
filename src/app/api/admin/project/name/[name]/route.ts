// src/app/api/admin/project/name/[name]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';
import { capitalizeFirstLetter } from '@/utils/functions';

export async function GET(request: NextRequest) {
  const nameParam = request.nextUrl.pathname.split('/').pop();
  const name = nameParam ? decodeURIComponent(nameParam) : null;

  if (!name) {
    return NextResponse.json({ error: 'Pas de projet trouvé car aucun nom fourni.' }, { status: 400 });
  }

  try {
    const project = await prisma.project.findFirst({
      where: { 
        title: {
          contains: capitalizeFirstLetter(name),  
          mode: 'insensitive',
        }
       },
    });

    if (!project) {
      return NextResponse.json({ error: 'Pas de projet fourni.' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération.' }, { status: 500 });
  }
}
