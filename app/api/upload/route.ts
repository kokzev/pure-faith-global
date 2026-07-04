// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
      token: process.env.BLOB_UP_READ_WRITE_TOKEN,   // ? Updated
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: file.size,
    });

  } catch (error: any) {
    console.error('Vercel Blob Upload Error:', error.message);

    if (error.message?.includes('private store') || error.message?.includes('Cannot use public access')) {
      return NextResponse.json({
        error: 'Blob store configuration mismatch. Please verify BLOB_UP_* variables and store access policy.'
      }, { status: 400 });
    }

    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
