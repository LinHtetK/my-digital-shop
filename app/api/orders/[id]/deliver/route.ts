// app/api/orders/[id]/deliver/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      buyer: true,
      listing: { include: { seller: true } },
    },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // --- In production: call your delivery integration (game transfer API, bot, etc.)
  // We'll simulate success:
  try {
    // simulate work...
    await prisma.order.update({
      where: { id },
      data: {
        deliveryStatus: "DELIVERED",
        status: "COMPLETED",
      },
    });

    // optionally mark listing sold or decrease stock (depends on model)
    // await prisma.listing.update({ where: { id: order.listingId }, data: { /* sold = true */ } });

    // TODO: send notification/email to buyer & seller

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    await prisma.order.update({
      where: { id },
      data: { deliveryStatus: "FAILED", status: "PROCESSING" },
    });
    return NextResponse.json({ error: "Delivery failed" }, { status: 500 });
  }
}
