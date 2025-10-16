"use client";

import { useState, useMemo } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";
import { Listing } from "@/app/generated/prisma";

export default function SellerDashboardClient({
  listings,
}: {
  listings: Listing[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");

  // 🔍 Filter + Sort Logic
  const filteredListings = useMemo(() => {
    const data = listings.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "date_asc")
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    if (sort === "date_desc")
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return data;
  }, [search, sort, listings]);

  return (
    <Box className="p-4">
      <Box className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Typography variant="h5" fontWeight="bold">
          My Listings
        </Typography>

        <Link href="/seller/new">
          <Button variant="contained" color="primary">
            + Add New Listing
          </Button>
        </Link>
      </Box>

      {/* Search & Sort Controls */}
      <Box className="flex flex-col md:flex-row gap-3 mb-6">
        <TextField
          label="Search by Title"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          fullWidth
        >
          <MenuItem value="date_desc">Newest First</MenuItem>
          <MenuItem value="date_asc">Oldest First</MenuItem>
          <MenuItem value="price_desc">Price: High → Low</MenuItem>
          <MenuItem value="price_asc">Price: Low → High</MenuItem>
        </Select>
      </Box>

      {/* Listing Grid */}
      {filteredListings.length === 0 ? (
        <Typography color="text.secondary" className="text-center mt-6">
          No listings found.
        </Typography>
      ) : (
        <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="shadow-md">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {listing.title}
                </Typography>
                <Typography className="text-gray-600 mb-2">
                  ${listing.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="mb-3">
                  {listing.description}
                </Typography>

                <Box className="flex gap-2">
                  <Link href={`/dashboard/seller/edit/${listing.id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <DeleteButton id={listing.id} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
