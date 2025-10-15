import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <DashboardLayout title="User Dashboard">
      <Grid container spacing={4}>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent>
            <Typography variant="h6">Welcome</Typography>
            <Typography variant="body1">{session.user.name}</Typography>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent>
            <Typography variant="h6">Your Role</Typography>
            <Typography variant="body1">{session.user.role}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </DashboardLayout>
  );
}
