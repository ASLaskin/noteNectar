import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, content } = body;

    if (!userId || !title || !content) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        content,
        userId, 
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Error processing request', error: error },
      { status: 500 }
    );
  }
}
