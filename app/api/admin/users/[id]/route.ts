import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const user = await prisma.user.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(user);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User deleted" });
}
