// src/app/api/admin/experience/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); 

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}
