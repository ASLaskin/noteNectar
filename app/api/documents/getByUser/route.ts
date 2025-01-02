import prisma from '@/app/libs/prismaDb';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), { status: 400 });
  }

  try {
    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(documents), { status: 200 });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch documents" }), { status: 500 });
  }
}
