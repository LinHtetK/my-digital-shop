import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <DashboardLayout title="Admin Dashboard">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">42</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">$12,345</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6">Pending Orders</Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
