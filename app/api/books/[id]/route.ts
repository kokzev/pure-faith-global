import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, author, description, coverImageUrl, fileUrl } = body;

    const book = await prisma.book.update({
      where: { id },
      data: { title, author, description, coverImageUrl, fileUrl },
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    console.error("Book Update Error:", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Book Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
