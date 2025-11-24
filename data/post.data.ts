import prisma from "@/lib/prisma";

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, email: true, image: true, name: true } },
        likes: { select: { userId: true } },
        comments: {
          select: {
            id: true,
            content: true,
            author: {
              select: { id: true, email: true, image: true, name: true },
            },
            createdAt: true,
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
