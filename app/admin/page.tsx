import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Welcome Admin 👑</h1>
      <p>You have full access to the system.</p>
    </main>
  );
}
