
/* Core */
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient()

export const dynamic = 'force-static'

export async function GET() {
  const users = await client.user.findMany();
  // const users = await client.user.findMany()
  // users[0].

  console.log('🚀 ~ GET ~ users:', users);


  return Response.json({ data: "Hello world" })
}

export async function POST() {
  const users = await client.user.findMany();

  console.log('🚀 ~ GET ~ users:', users);


  return Response.json({ data: "Hello world" })
}