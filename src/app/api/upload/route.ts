import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files = data.getAll('images');  

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 });
    }

    const savedFileNames: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${uuidv4()}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public', 'assets', 'project', uniqueName);

      await writeFile(filePath, buffer);
      savedFileNames.push(`/uploads/${uniqueName}`);
    }

    return NextResponse.json({ success: true, files: savedFileNames });
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ error: 'Échec de l’upload' }, { status: 500 });
  }
}
