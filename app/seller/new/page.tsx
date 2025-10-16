import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Box, Typography, TextField, Button } from "@mui/material";
import SellerListingForm from "@/components/SellerListingForm";

export default async function NewListingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/login");
  if (user.role !== "SELLER" || !user.isVerifiedSeller)
    redirect("/unauthorized");

  return (
    <DashboardLayout title="Add New Listing">
      <SellerListingForm />
      {/* <Box
        component="form"
        action="/api/listings"
        method="POST"
        className="max-w-lg mx-auto mt-8 bg-white p-8 shadow-md rounded-xl flex flex-col gap-4"
      >
        <Typography variant="h5" fontWeight="bold" className="text-center">
          Create New Listing
        </Typography>

        <TextField name="title" label="Title" required fullWidth />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          required
          fullWidth
        />
        <TextField
          name="price"
          label="Price (USD)"
          type="number"
          required
          fullWidth
        />
        <TextField name="gameType" label="Game Type" required fullWidth />

        <Button variant="contained" color="primary" type="submit">
          Create Listing
        </Button>
      </Box> */}
    </DashboardLayout>
  );
}
