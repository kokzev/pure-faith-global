import { put } from "@vercel/blob";

export async function POST(req: Request): Promise<Response> {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided." }, { status: 400 });
    }

    const allowedTypes = [
      "audio/mpeg", "audio/wav", "audio/mp4",
      "video/mp4", "video/webm", "video/quicktime",
      "image/jpeg", "image/png", "image/webp",
      "application/pdf", "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
    }

    const MAX_SIZE = 200 * 1024 * 1024; // 200MB
    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File exceeds 200MB limit." }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return Response.json({ url: blob.url, contentType: file.type });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
