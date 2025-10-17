"use client";

import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BuyButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");

      // For dev: call dev pay endpoint to simulate payment & delivery
      const devPay = await fetch("/api/dev/pay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.order.id }),
      });

      if (!devPay.ok) throw new Error("Dev payment failed");

      toast.success("Order placed — delivery in progress");
      router.push("/orders"); // go to buyer orders
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) toast.error(err?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      sx={{
        width: { xs: "100%", sm: "auto" },
        borderRadius: "12px",
        fontWeight: 600,
      }}
      variant="contained"
      color="primary"
      onClick={handleBuy}
      disabled={loading}
    >
      {loading ? "Processing..." : "Buy Now"}
    </Button>
  );
}
