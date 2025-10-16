"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SellerListingForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Listing created successfully!");
        router.push("/seller");
      } else {
        toast.error("Failed to create listing.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Create Listing"}
      </Button>
    </Box>
  );
}
