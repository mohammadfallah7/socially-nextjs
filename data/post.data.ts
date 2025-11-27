import prisma from "@/lib/prisma";

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        author: { select: { name: true, email: true, image: true } },
        likes: { select: { userId: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
