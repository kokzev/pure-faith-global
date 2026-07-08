import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "singleton" } });
    }
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Get Settings Error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { aboutPhotoUrl } = body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { aboutPhotoUrl },
      create: { id: "singleton", aboutPhotoUrl },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Update Settings Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
