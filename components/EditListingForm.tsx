"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Listing } from "@/app/generated/prisma";

export default function EditListingForm({ listing }: { listing: Listing }) {
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    price: listing.price,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/listings/${listing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Listing updated successfully!");
        router.push("/seller");
      } else {
        toast.error("Failed to update listing");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 bg-white p-8 shadow-md rounded-xl flex flex-col gap-4"
    >
      <Typography variant="h5" fontWeight="bold" className="text-center">
        Edit Listing
      </Typography>

      <TextField
        name="title"
        label="Title"
        required
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <TextField
        name="description"
        label="Description"
        multiline
        rows={4}
        required
        fullWidth
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        name="price"
        label="Price (USD)"
        type="number"
        required
        fullWidth
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Save Changes"}
      </Button>
    </Box>
  );
}
