"use client";

import toast from "react-hot-toast";
import { Button } from "@mui/material";

export function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Listing deleted!");
      window.location.reload();
    } else {
      toast.error("Failed to delete listing");
    }
  };

  return (
    <Button onClick={handleDelete} variant="outlined" color="error">
      Delete
    </Button>
  );
}
