import prisma from '@/app/libs/prismaDb';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { noteId, newTitle } = body;

    if (!noteId || !newTitle) {
      return new Response(JSON.stringify({ message: "Note ID and new title are required" }), { status: 400 });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: noteId },
      data: { title: newTitle },
    });

    return new Response(JSON.stringify(updatedDocument), { status: 200 });
  } catch (error) {
    console.error("Error renaming document:", error);
    return new Response(JSON.stringify({ message: "Failed to rename document" }), { status: 500 });
  }
}