import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { buyerId: session.user.id },
    include: { listing: { include: { seller: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box className="p-6">
      <Typography variant="h5" className="mb-4">
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((o) => (
          <Grid key={o.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{o.listing.title}</Typography>
                <Typography>${o.amount}</Typography>
                <Typography>Payment: {o.paymentStatus}</Typography>
                <Typography>Delivery: {o.deliveryStatus}</Typography>
                <Chip label={o.status} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
