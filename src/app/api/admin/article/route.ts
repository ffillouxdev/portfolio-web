// src/app/api/admin/article/route.ts

import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request: Request) {
  const {id, title, categorie, date, readTimeMinutes, likes, views, descs, comments, screens } = await request.json();
try {
  const newArticle = await prisma.article.create({
    data: {
        id,
        title,
        categorie,
        date,
        readTimeMinutes,
        likes,
        views,
        descs,
        comments, 
        screens
    },
  });
  return NextResponse.json(newArticle, { status: 201 });
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed to create article.' }, { status: 500 });
}

}
