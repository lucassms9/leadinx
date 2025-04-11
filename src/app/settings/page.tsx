"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { useNotification } from "@/contexts/NotificationContext";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Minha Empresa",
    companyEmail: "contato@empresa.com",
    companyPhone: "(11) 99999-9999",
    notificationsEnabled: true,
    darkMode: true,
    language: "pt-BR",
  });

  const { showNotification } = useNotification();

  const handleSave = () => {
    // TODO: Implement save logic
    showNotification("Configurações salvas com sucesso!");
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Configurações</Typography>
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Informações da Empresa
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome da Empresa"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                value={settings.companyPhone}
                onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Preferências
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notificationsEnabled}
                    onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                  />
                }
                label="Notificações ativadas"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                  />
                }
                label="Modo escuro"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
} 