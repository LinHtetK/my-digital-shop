"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "SELLER" | "ADMIN";
  isVerifiedSeller: boolean;
}

export default function AdminUsersClient({ users }: { users: User[] }) {
  const [userList, setUserList] = useState<User[]>(users);

  const handleRoleChange = async (id: string, newRole: User["role"]) => {
    const res = await fetch("/api/admin/changeRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, newRole }),
    });

    const result = await res.json();
    if (result.success) {
      setUserList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      toast.success("Role successfully change!");
    }
  };

  const handleVerifyToggle = async (id: string) => {
    const res = await fetch("/api/admin/changeRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, toggleVerify: true }),
    });

    const result = await res.json();
    if (result.success) {
      setUserList((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, isVerifiedSeller: !u.isVerifiedSeller } : u
        )
      );
      toast.success("Seller verified successfully!");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUserList((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully!");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Manage Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  size="small"
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="SELLER">SELLER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{u.isVerifiedSeller ? "✅" : "❌"}</TableCell>
              <TableCell>
                {u.isVerifiedSeller ? (
                  <Chip
                    label="Verified"
                    color="success"
                    onClick={() => handleVerifyToggle(u.id)}
                    className="cursor-pointer"
                  />
                ) : (
                  <Chip
                    label="Unverified"
                    color="default"
                    onClick={() => handleVerifyToggle(u.id)}
                    className="cursor-pointer"
                  />
                )}
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
