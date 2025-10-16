import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { prisma } from "@/lib/db";
import EditListingForm from "@/components/EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/login");
  if (user.role !== "SELLER" || !user.isVerifiedSeller)
    redirect("/unauthorized");

  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  if (!listing) redirect("/seller");

  return (
    <DashboardLayout title="Edit Listing">
      <EditListingForm listing={listing} />
    </DashboardLayout>
  );
}
