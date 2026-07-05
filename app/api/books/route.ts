import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ books });
  } catch (error) {
    console.error("List Books Error:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, author, description, coverImageUrl, fileUrl } = body;

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const book = await prisma.book.create({
      data: { title, author, description, coverImageUrl, fileUrl },
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    console.error("Book Create Error:", error);
    return NextResponse.json({ error: "Failed to save book" }, { status: 500 });
  }
}
