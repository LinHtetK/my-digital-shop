import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";
import Grid from "@mui/material/Grid";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { prisma } from "@/lib/db";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/login");
  if (user.role !== "SELLER" || !user.isVerifiedSeller)
    redirect("/unauthorized");
  const listings = await prisma.listing.findMany({
    where: { sellerEmail: session.user.email as string },
    orderBy: { createdAt: "desc" },
  });
  return (
    <DashboardLayout title="Seller Dashboard">
      <Typography variant="h5" className="mb-4 font-semibold">
        Your Listings
      </Typography>

      <Grid container spacing={4}>
        {listings.length === 0 ? (
          <Typography>No listings yet. Create one below!</Typography>
        ) : (
          listings.map((listing) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={listing.id}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent>
                  <Typography variant="h6">{listing.title}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {listing.game}
                  </Typography>
                  <Typography variant="body1" className="font-semibold mt-2">
                    ${listing.price}
                  </Typography>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/seller/edit/${listing.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      href={`/seller/delete/${listing.id}`}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <div className="mt-6">
        <Button variant="contained" color="primary" href="/seller/new">
          ➕ Add New Listing
        </Button>
      </div>
    </DashboardLayout>
  );
}
