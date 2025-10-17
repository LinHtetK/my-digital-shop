// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { listingId, paymentMethod } = await req.json();
    if (!listingId)
      return NextResponse.json({ error: "Missing listingId" }, { status: 400 });

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });

    // Create order
    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        listingId,
        amount: listing.price,
        currency: "USD",
        paymentMethod: paymentMethod ?? null,
        paymentStatus: "PENDING",
        status: "CREATED",
      },
    });

    // In production: create payment session (Stripe/other) and return client session
    // For now return order object (dev flow)
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
