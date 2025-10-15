"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Fetch current session
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "ADMIN") router.push("/admin");
      else router.push("/dashboard");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
}
