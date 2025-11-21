import prisma from "@/lib/prisma";

export async function getUserInformation(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { followers: true, followings: true } } },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
