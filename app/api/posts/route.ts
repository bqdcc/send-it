import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/prisma/client';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const isAuth = searchParams.get('isAuth');

    if (!isAuth) {
        try {
            const result = await prisma.post.findMany({
                include: { user: true, comments: true },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json({ data: result });
        } catch (error) {
            return NextResponse.json(
                { error: 'Error has occurred whilst get posts!' },
                { status: 403 }
            );
        }
    }

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Please sign in to make post!' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email || undefined },
    });

    try {
        const result = await prisma.post.findMany({
            include: { user: true, comments: true },
            where: { userId: user?.id },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ data: result });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error has occurred whilst get posts!' },
            { status: 403 }
        );
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Please sign in to make post!' }, { status: 401 });
    }

    const body = await req.json();

    if (!body && !body.title) {
        return NextResponse.json({ message: 'Parameter is wrong!!!' }, { status: 401 });
    }

    if (!body.title.length) {
        return NextResponse.json({ message: 'Please do not leave empty!' }, { status: 403 });
    }

    if (body.title.length > 255) {
        return NextResponse.json({ message: 'Please write a shorter!' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email || undefined },
    });

    try {
        const result = await prisma.post.create({
            data: { title: body.title, userId: user?.id || '' },
        });
        return NextResponse.json({ data: result });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error has occurred whilst make a post!' },
            { status: 403 }
        );
    }
}
