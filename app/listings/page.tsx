import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";
import { prisma } from "@/lib/db";

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!listings.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        No listings available yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {listings.map((listing) => (
        <Link key={listing.id} href={`/listings/${listing.id}`}>
          <Card className="hover:shadow-md transition">
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {listing.title}
              </Typography>
              <Typography color="text.secondary">${listing.price}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
