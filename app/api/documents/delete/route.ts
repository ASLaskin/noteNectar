import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { noteId } = await request.json();

    if (!noteId) {
      return NextResponse.json(
        { message: 'Missing required field: noteId' },
        { status: 400 }
      );
    }

    const deletedDocument = await prisma.document.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json(
      { message: 'Note deleted successfully', deletedDocument },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting note:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Error processing request', error: error.message },
      { status: 500 }
    );
  }
}
