"use client";

import { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { Listing, User } from "../app/generated/prisma";
type ListingWithSeller = Listing & { seller: User };

export default function AdminListingsClient({
  listings,
}: {
  listings: ListingWithSeller[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(listings);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.seller.name?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "approved"
          ? item.approved
          : !item.approved;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, data]);

  const handleAction = async (
    id: string,
    action: "approve" | "reject" | "delete"
  ) => {
    const res = await fetch(`/api/admin/listings/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      setData((prev) =>
        prev
          .map((l) =>
            l.id === id
              ? { ...l, approved: action === "approve" ? true : false }
              : l
          )
          .filter((l) => (action === "delete" ? l.id !== id : true))
      );
    }
  };

  return (
    <Box className="p-4">
      <Typography variant="h5" fontWeight="bold" className="text-center mb-4">
        Listing Moderation
      </Typography>

      <Box className="flex flex-col md:flex-row gap-3 mb-6">
        <TextField
          label="Search by title or seller"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </Box>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" className="text-center mt-6">
          No listings found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((listing) => (
            <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card className="shadow-md hover:shadow-lg transition">
                <CardContent>
                  <Typography variant="h6">{listing.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${listing.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    Seller: {listing.seller.name || "Unknown"}
                  </Typography>
                  <Chip
                    label={listing.approved ? "Approved" : "Pending"}
                    color={listing.approved ? "success" : "warning"}
                    size="small"
                    className="mb-3"
                  />
                  <Box className="flex flex-wrap gap-2">
                    {!listing.approved && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleAction(listing.id, "approve")}
                      >
                        Approve
                      </Button>
                    )}
                    {listing.approved && (
                      <Button
                        variant="outlined"
                        color="warning"
                        size="small"
                        onClick={() => handleAction(listing.id, "reject")}
                      >
                        Reject
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleAction(listing.id, "delete")}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
