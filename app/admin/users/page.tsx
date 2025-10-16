// app/admin/users/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminUsersClient from "@/components/AdminUsersClient";
import DashboardLayout from "@/components/DashboardLayout";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerifiedSeller: true,
      createdAt: true,
    },
  });

  return (
    <DashboardLayout title="Admin Dashboard">
      <AdminUsersClient users={users} />
    </DashboardLayout>
  );
}
