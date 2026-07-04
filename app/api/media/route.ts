@'
  // app/api/media/route.ts
  import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_UP_READ_WRITE_TOKEN,
      prefix: '',
    });
    return NextResponse.json({ blobs });
  } catch (error: any) {
    console.error('List Blobs Error:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, type, url } = body;

    if (!title || !type || !url) {
      return NextResponse.json({ error: 'Missing title, type, or url' }, { status: 400 });
    }

    const media = await prisma.media.create({
      data: { title, type, url },
    });

    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    console.error('Media Create Error:', error);
    return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 });
  }
}
'@ | Set-Content app\api\media\route.ts
