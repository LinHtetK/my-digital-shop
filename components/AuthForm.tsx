"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "register" ? "/api/register" : "/api/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Something went wrong");

      if (mode === "login") {
        if (data.user.role === "ADMIN") router.push("/admin");
        else router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8"
    >
      <Typography variant="h5" className="text-center font-semibold mb-6">
        {mode === "register" ? "Create Account" : "Welcome Back"}
      </Typography>

      {mode === "register" && (
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      {error && (
        <Typography color="error" className="text-sm mt-2 text-center">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="mt-6 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Please wait..." : mode === "register" ? "Sign Up" : "Login"}
      </Button>

      <Typography className="text-center mt-4 text-sm">
        {mode === "register" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </>
        )}
      </Typography>
    </Box>
  );
}
