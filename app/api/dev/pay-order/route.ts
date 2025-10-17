// app/api/dev/pay-order/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { orderId } = await req.json();
  if (!orderId)
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: "PAID",
      status: "PROCESSING",
      paymentProvider: "DEV",
      providerData: { note: "dev-simulated" },
    },
  });

  // trigger delivery (call internal)
  try {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
      }/api/orders/${orderId}/deliver`,
      {
        method: "POST",
      }
    );
  } catch (e) {
    console.error("Auto-delivery trigger failed (dev):", e);
  }

  return NextResponse.json({ ok: true, order });
}
