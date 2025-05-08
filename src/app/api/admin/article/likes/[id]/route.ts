import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const articleId = parseInt(params.id);
        const updated = await prisma.article.update({
            where: { id: articleId },
            data: {
                likes: { increment: 1 },
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Erreur incrémentation like :', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

