import { db } from '@vercel/postgres';
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server';

const client = await db.connect();

export async function GET(params: NextRequest) {
  const value = params.nextUrl.searchParams.get('value');
  const revenue = value ? Number(value) : 2000;
  try {
    const res = await client.sql`UPDATE revenue SET revenue = ${revenue} WHERE month = 'Jan'`;
    revalidateTag('revenue');
    return Response.json({ message: res.rows });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
