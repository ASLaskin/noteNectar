import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 });
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Organize the following text into a sensical set of notes with definitions and explanations:\n\n${text}`,
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

    return new NextResponse(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error generating notes:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
