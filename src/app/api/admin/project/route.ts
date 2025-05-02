// src/app/api/admin/project/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request: Request) {
  const { title, date, skills, desc, jobTitle, link } = await request.json();

  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        date,
        skills: JSON.parse(skills),
        desc,
        jobTitle,
        link,
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
