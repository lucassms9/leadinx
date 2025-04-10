"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  WhatsApp as WhatsAppIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { useNotification } from "@/contexts/NotificationContext";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status:
    | "new"
    | "contacted"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed";
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const id = "123";
export default function LeadDetails() {
  const [lead, setLead] = useState<Lead | null>(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Aqui você faria a chamada à API para buscar os detalhes do lead
    // Por enquanto, vamos usar dados mockados
    setLead({
      id: id,
      name: "João Silva",
      email: "joao@example.com",
      phone: "(11) 99999-9999",
      company: "Empresa XYZ",
      status: "new",
      source: "Website",
      notes: "Cliente interessado em nosso produto premium.",
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
    });
  }, [id]);

  const handleEdit = () => {
    router.push(`/leads/${id}/edit`);
  };

  const handleDelete = () => {
    // Aqui você implementaria a lógica de deleção
    showNotification("Lead deletado com sucesso!", "success");
    router.push("/leads");
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "default";
      case "contacted":
        return "primary";
      case "qualified":
        return "info";
      case "proposal":
        return "warning";
      case "negotiation":
        return "secondary";
      case "closed":
        return "success";
      default:
        return "default";
    }
  };

  if (!lead) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography>Carregando...</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" component="h1">
            Detalhes do Lead
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mr: 1 }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                "@media (prefers-color-scheme: dark)": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                  {lead.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h2">
                    {lead.name}
                  </Typography>
                  <Chip
                    label={lead.status}
                    color={getStatusColor(lead.status)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography>{lead.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography>{lead.phone}</Typography>
                    <Tooltip title="Enviar mensagem no WhatsApp">
                      <IconButton
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => {
                          const phone = lead.phone.replace(/\D/g, "");
                          window.open(`https://wa.me/${phone}`, "_blank");
                        }}
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <BusinessIcon sx={{ mr: 1 }} />
                    <Typography>{lead.company}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationIcon sx={{ mr: 1 }} />
                    <Typography>Origem: {lead.source}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Observações
                </Typography>
                <Typography>{lead.notes}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                "@media (prefers-color-scheme: dark)": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Histórico
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Criado em
                  </Typography>
                  <Typography>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Última atualização
                  </Typography>
                  <Typography>
                    {new Date(lead.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
