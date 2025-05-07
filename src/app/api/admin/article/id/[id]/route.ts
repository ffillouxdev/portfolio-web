// src/app/api/admin/article/id/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); 

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!article) {
      return NextResponse.json({ error: 'article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); 

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const updatedData = await request.json();

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id, 10) },
      data: updatedData,
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}
