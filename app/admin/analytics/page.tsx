import DashboardLayout from "@/components/DashboardLayout";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import AdminChart from "@/components/AdminChart";

export default async function AdminAnalyticsPage() {
  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/stats`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <DashboardLayout title="Admin Analytics Overview">
      <Box className="p-6">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="shadow-md bg-blue-100">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Total Users
                </Typography>
                <Typography variant="h4">{stats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="shadow-md bg-green-100">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Total Listings
                </Typography>
                <Typography variant="h4">{stats.totalListings}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="shadow-md bg-yellow-100">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Approved Listings
                </Typography>
                <Typography variant="h4">{stats.approvedListings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className="mt-8">
          <AdminChart data={stats.monthlyStats} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
