"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { User, UserRole } from "@/types/user";
import { useNotification } from "@/contexts/NotificationContext";

// Mock data for demonstration
const mockUser: User = {
  id: "1",
  name: "Admin Master",
  email: "admin@example.com",
  role: "master",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function UserDetailsPage() {
  const [user, setUser] = useState<User>(mockUser);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSave = () => {
    // TODO: Implement save logic
    showNotification("Usuário salvo com sucesso!");
    router.push("/users");
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Editar Usuário</Typography>
          <Button
            variant="outlined"
            onClick={() => router.push("/users")}
          >
            Voltar
          </Button>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Função</InputLabel>
                <Select
                  value={user.role}
                  label="Função"
                  onChange={(e) => setUser({ ...user, role: e.target.value as UserRole })}
                >
                  <MenuItem value="master">Master</MenuItem>
                  <MenuItem value="consultant">Consultor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
} 