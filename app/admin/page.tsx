import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography } from "@mui/material";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") redirect("/login");

  // Fetch users from DB
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  return (
    <DashboardLayout title="Admin Dashboard">
      <Grid container spacing={4}>
        {/* Stats Cards */}

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{users.length}</Typography>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent>
            <Typography variant="h6">Admins</Typography>
            <Typography variant="h4">
              {users.filter((u) => u.role === "ADMIN").length}
            </Typography>
          </CardContent>
        </Card>

        {/* Users List */}

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Users List
            </Typography>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </DashboardLayout>
  );
}
