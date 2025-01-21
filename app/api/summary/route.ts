import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/app/libs/prismaDb";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, userId } = body;

    if (!text || !userId) {
      return NextResponse.json({ message: "Text and userId are required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.credits < 1) {
      return NextResponse.json({ message: "Insufficient credits" }, { status: 403 });
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Organize the following text into well-structured Markdown notes. Use headings (e.g., #, ##), bullet points, bold, and italics for clear formatting.:\n\n${text}`,
        },
      ],
      stream: true,
    });

    const readableStream = new ReadableStream({
      start(controller) {
        (async () => {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(content);
            }
          }
          controller.close(); 
        })().catch((error) => {
          controller.error(error); 
        });
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { credits: user.credits - 1 },
    });

    return new NextResponse(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error generating notes:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
