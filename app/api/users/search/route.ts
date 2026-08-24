import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get("q");

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to search users",
          success: false,
        },
        { status: 401 },
      );
    }

    if (!term) {
      return NextResponse.json({
        message: "users fetched successfully",
        success: true,
        data: [],
      });
    }

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id },
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
