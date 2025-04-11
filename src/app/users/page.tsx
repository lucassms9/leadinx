"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { User } from "@/types/user";

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Master",
    email: "admin@example.com",
    role: "master",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Consultor 1",
    email: "consultor1@example.com",
    role: "consultant",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Usuários</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/users/new")}
          >
            Novo Usuário
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Buscar por nome"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Função</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "master" ? "Master" : "Consultor"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => router.push(`/users/${user.id}`)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
} 