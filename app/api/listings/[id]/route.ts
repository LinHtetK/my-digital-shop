import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// 🟢 Update Listing
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  try {
    const updated = await prisma.listing.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// 🔴 Delete Listing
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.listing.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
