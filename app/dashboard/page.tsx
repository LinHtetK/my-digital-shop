import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography } from "@mui/material";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <DashboardLayout title="User Dashboard">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Welcome Back
              </Typography>
              <Typography variant="body1">
                {session.user?.name || "User"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Your Role
              </Typography>
              <Typography variant="body1">
                {session.user?.role || "user"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Email
              </Typography>
              <Typography variant="body1">{session.user?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
