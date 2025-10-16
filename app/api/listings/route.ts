import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role !== "SELLER" || !user.isVerifiedSeller)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const game = formData.get("gameType") as string;

    if (!title || !description || isNaN(price) || !game)
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );

    await prisma.listing.create({
      data: {
        title,
        description,
        price,
        game,
        sellerId: user.id!,
      },
    });

    return NextResponse.redirect(new URL("/seller", req.url));
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
