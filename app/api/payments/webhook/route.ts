import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PSEUDO: assume provider posts { orderId, providerId, status }
export async function POST(req: Request) {
  const body = await req.json();

  const { orderId, providerId, status } = body;
  if (!orderId || !status)
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });

  // idempotency: check if already PAID
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (order.paymentStatus === "PAID") {
    return NextResponse.json({ ok: true, msg: "Already processed" });
  }

  if (status === "succeeded" || status === "PAID") {
    // update order
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        paymentProvider: providerId,
        status: "PROCESSING",
      },
    });

    // trigger delivery (call internal endpoint)
    // IMPORTANT: delivery should be retried / queued in production (background worker)
    try {
      // naive immediate call
      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${orderId}/deliver`,
        {
          method: "POST",
        }
      );
    } catch (e) {
      console.error("Auto-delivery trigger failed:", e);
    }

    return NextResponse.json({ ok: true, updated });
  } else {
    // handle payment failed
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: "FAILED", status: "CANCELLED" },
    });
    return NextResponse.json({ ok: false });
  }
}
