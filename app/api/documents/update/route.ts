import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { noteId, title, content } = body;

    if (!noteId || !title || !content) {
      return NextResponse.json({ message: "Note ID, title, and content are required" }, { status: 400 });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: noteId },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedDocument, { status: 200 });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json({ message: "Failed to update document", error }, { status: 500 });
  }
}
