import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminListingsClient from "@/components/AdminListingsClient";
import DashboardLayout from "@/components/DashboardLayout";

export default async function AdminListingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const listings = await prisma.listing.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardLayout title="Admin Listings Management">
      <AdminListingsClient listings={listings} />
    </DashboardLayout>
  );
}
