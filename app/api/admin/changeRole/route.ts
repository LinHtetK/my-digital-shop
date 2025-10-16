import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface ChangeRoleRequest {
  role?: "USER" | "SELLER" | "ADMIN";
  isVerifiedSeller?: boolean;
}

export async function POST(req: Request) {
  try {
    const { userId, newRole, toggleVerify } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const data: ChangeRoleRequest = {};

    if (newRole) data.role = newRole;
    if (toggleVerify !== undefined) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      data.isVerifiedSeller = !user.isVerifiedSeller;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error changing role or verification:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
