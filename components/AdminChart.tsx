"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  data: { month: string; sales: number; listings: number }[];
}

export default function AdminChart({ data }: Props) {
  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" fontWeight="bold" className="mb-4 text-center">
          Monthly Sales Overview
        </Typography>
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 250,
            overflowX: "auto",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1976d2"
                strokeWidth={2}
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="listings"
                stroke="#2e7d32"
                strokeWidth={2}
                name="Listings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
