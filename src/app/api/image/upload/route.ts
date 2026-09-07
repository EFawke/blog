import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Client } from 'pg';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToDatabase =  async (image: {src: string, alt: string}) => {
  const client = await new Client({ connectionString: process.env.DATABASE_URL }).connect();
  const sql = `INSERT INTO images (src, alt) VALUES ($1, $2);`;
  const values = [image.src, image.alt];
  try {
    return await client.query(sql, values);
  }
  finally {
    await client.end();
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });

    const image = {
      src: result.secure_url,
      alt: file.name
    };

    await uploadImageToDatabase(image);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}