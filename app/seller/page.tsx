import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/login");
  if (user.role !== "SELLER" || !user.isVerifiedSeller)
    redirect("/unauthorized");

  return (
    <div className="p-8">
      {session?.user?.role === "SELLER" && session?.user?.isVerifiedSeller && (
        <Link href="/seller" className="text-blue-600 font-medium">
          Seller Dashboard
        </Link>
      )}
      <h1 className="text-2xl font-semibold mb-4">Seller Dashboard</h1>

      <p>Welcome back, {user.name}! 👋</p>
      <p>You are a verified seller — manage your game accounts here.</p>
    </div>
  );
}
