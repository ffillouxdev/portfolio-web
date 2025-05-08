// src/app/api/admin/article/views/[id]/route.ts :
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    try {
        const articleId = parseInt(id, 10);
        if (isNaN(articleId)) {
            return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
        }

        const updated = await prisma.article.update({
            where: { id: articleId },
            data: {
                views: { increment: 1 },
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Erreur incrémentation vue :', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
