import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";
import Grid from "@mui/material/Grid";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";

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
  console.log("listings : ", listings);

  return (
    <DashboardLayout title="Seller Dashboard">
      <Box className="p-8">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" fontWeight="bold">
            Your Listings
          </Typography>
          <Link href="/seller/new">
            <Button variant="contained" color="primary">
              Add New Listing
            </Button>
          </Link>
        </Box>

        {listings.length === 0 ? (
          <Typography>No listings yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {listings.map((listing) => (
              <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="mt-2 font-semibold"
                    >
                      ${listing.price}
                    </Typography>

                    <Box className="flex gap-2 mt-4">
                      <Link href={`/seller/edit/${listing.id}`}>
                        <Button variant="outlined">Edit</Button>
                      </Link>
                      <form
                        action={`/api/listings/${listing.id}`}
                        method="POST"
                      >
                        <input type="hidden" name="_method" value="DELETE" />
                        <DeleteButton id={listing.id} />
                      </form>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </DashboardLayout>
  );
}
