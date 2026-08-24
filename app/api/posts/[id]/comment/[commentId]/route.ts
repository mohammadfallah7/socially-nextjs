import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) {
  const { id, commentId } = await params;

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to delete a comment",
          success: false,
        },
        { status: 401 },
      );
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });
    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
          success: false,
        },
        { status: 404 },
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true },
    });
    if (!comment) {
      return NextResponse.json(
        {
          message: "Comment not found",
          success: false,
        },
        { status: 404 },
      );
    }

    if (comment.authorId !== session.user.id) {
      return NextResponse.json(
        {
          message: "You must be the author of the comment to delete it",
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    await prisma.comment.delete({ where: { id: comment.id } });
    return NextResponse.json({
      message: "Comment deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete comment",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
