import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const json = await request.json();

    const { id } = json;    
    console.log("Received id:", id);

    if (!id) {
      console.log("note doesn't exist");
      return NextResponse.json(
        { message: 'Missing required field: id' },
        { status: 400 }
      );
    }

    const deletedDocument = await prisma.document.delete({
      where: {
        id: id,
      },
    });
    console.log("Deleted successfully");

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
