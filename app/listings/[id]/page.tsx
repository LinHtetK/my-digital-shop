import BuyButton from "@/components/BuyButton";

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/listings/${params.id}`
  );
  const listing = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600 mb-2">Price: ${listing.price}</p>
      <BuyButton listingId={listing.id} />
    </div>
  );
}
