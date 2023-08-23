import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const result = await prisma.post.findUnique({
            include: {
                user: true,
                comments: { orderBy: { createdAt: 'desc' }, include: { user: true } },
            },
            where: { id: params.id },
        });
        return NextResponse.json({ data: result });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error has occurred whilst get posts!' },
            { status: 403 }
        );
    }
}
