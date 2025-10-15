import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Welcome {session.user.name || "User"} 👋</h1>
      <p>Role: {session.user.role}</p>
    </main>
  );
}
