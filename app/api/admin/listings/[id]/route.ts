import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { action } = await req.json();
  const id = params.id;

  if (action === "approve") {
    await prisma.listing.update({ where: { id }, data: { approved: true } });
  } else if (action === "reject") {
    await prisma.listing.update({ where: { id }, data: { approved: false } });
  } else if (action === "delete") {
    await prisma.listing.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
