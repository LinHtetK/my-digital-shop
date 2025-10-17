import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalUsers, totalListings, approvedListings] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.listing.count({ where: { approved: true } }),
    ]);

    // Fake monthly data for chart (you can replace with real DB analytics later)
    const monthlyStats = [
      { month: "Jan", sales: 5, listings: 7 },
      { month: "Feb", sales: 8, listings: 4 },
      { month: "Mar", sales: 3, listings: 9 },
      { month: "Apr", sales: 10, listings: 5 },
      { month: "May", sales: 6, listings: 8 },
      { month: "Jun", sales: 12, listings: 11 },
    ];

    return NextResponse.json({
      totalUsers,
      totalListings,
      approvedListings,
      monthlyStats,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
