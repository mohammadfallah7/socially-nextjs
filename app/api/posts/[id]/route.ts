import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to delete a post",
          success: false,
        },
        { status: 401 }
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
        { status: 404 }
      );
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        {
          message: "You must be the author of the post to delete it",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await prisma.post.delete({ where: { id: post.id } });
    return NextResponse.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete post",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to like or dislike a post",
          success: false,
        },
        { status: 401 }
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
        { status: 404 }
      );
    }

    if (post.authorId === session.user.id) {
      return NextResponse.json(
        {
          message: "You can't like or dislike your post",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const like = await prisma.like.findUnique({
      where: { userId_postId: { postId: post.id, userId: session.user.id } },
    });

    if (like) {
      await prisma.like.delete({
        where: { userId_postId: { postId: post.id, userId: session.user.id } },
      });
      return NextResponse.json({
        message: "Post disliked successfully",
        success: true,
      });
    } else {
      await prisma.$transaction([
        prisma.like.create({
          data: { postId: post.id, userId: session.user.id },
        }),
        prisma.notification.create({
          data: {
            type: "LIKE",
            creatorId: session.user.id,
            userId: post.authorId,
            postId: post.id,
          },
        }),
      ]);
      return NextResponse.json({
        message: "Post liked successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to like or dislike a post",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
