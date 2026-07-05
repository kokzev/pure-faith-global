import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, type, url, content, thumbnailUrl, embedUrl } = body;

    const media = await prisma.media.update({
      where: { id },
      data: { title, type, url, content, thumbnailUrl, embedUrl },
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error("Media Update Error:", error);
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
