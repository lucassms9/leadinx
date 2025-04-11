'use client';

import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  IconButton,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Lead } from "@/types/lead";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SupervisorAccount, Person, WhatsApp } from "@mui/icons-material";
import Layout from '@/components/Layout';

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Typography color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 99999-9999",
    company: "Empresa A",
    stage: "Aguardando",
    temperature: "Cinza",
    source: "Site",
    site: "www.example.com",
    socialMedia: "Instagram",
    visit: "Loja A",
    notes: "Cliente interessado em produto X",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
    status: "new",
    interest: "Alto",
    product: "Produto A",
    model: "Modelo X",
    value: 1000,
    reminders: [
      {
        id: "1",
        text: "Ligar para cliente amanhã às 10h",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        text: "Enviar proposta comercial",
        completed: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    history: [],
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(11) 88888-8888",
    company: "Empresa B",
    stage: "Em atendimento",
    temperature: "Amarelo",
    source: "Redes sociais",
    site: "www.example2.com",
    socialMedia: "Facebook",
    visit: "Loja B",
    notes: "Precisa de orçamento urgente",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [],
    status: "contacted",
    interest: "Médio",
    product: "Produto B",
    model: "Modelo Y",
    value: 2000,
    reminders: [
      {
        id: "3",
        text: "Agendar reunião de apresentação",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ],
    history: [],
  },
];

export default function Dashboard() {
  const [view, setView] = useState<"master" | "consultant">("master");
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: "master" | "consultant"
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleReminderToggle = (leadId: string, reminderId: string) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          reminders: lead.reminders.map(reminder => {
            if (reminder.id === reminderId) {
              return {
                ...reminder,
                completed: !reminder.completed
              };
            }
            return reminder;
          })
        };
      }
      return lead;
    }));
  };

  // Mock data for demonstration
  const stats = [
    { title: 'Total Leads', value: 150 },
    { title: 'Leads em Aberto', value: 45 },
    { title: 'Leads Atendidos', value: 85 },
    { title: 'Leads Descartados', value: 20 },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
          >
            <ToggleButton value="master" aria-label="master view">
              <SupervisorAccount sx={{ mr: 1 }} />
              Master
            </ToggleButton>
            <ToggleButton value="consultant" aria-label="consultant view">
              <Person sx={{ mr: 1 }} />
              Consultor
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {view === "master" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={3}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={6} md={3} key={stat.title}>
                  <StatCard title={stat.title} value={stat.value} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Lembretes
                </Typography>
                <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                  {leads
                    .filter((lead) => lead.reminders.length > 0)
                    .map((lead) => (
                      <Paper
                        key={lead.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          backgroundColor: "background.default",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                        onClick={() => router.push(`/leads/${lead.id}`)}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          {lead.name}
                        </Typography>
                        {lead.reminders.map((reminder) => (
                          <Box
                            key={reminder.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={reminder.completed}
                              onChange={() => handleReminderToggle(lead.id, reminder.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: reminder.completed ? "line-through" : "none",
                                color: reminder.completed ? "text.secondary" : "text.primary",
                                flex: 1,
                              }}
                            >
                              {reminder.text}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(reminder.createdAt), "dd/MM/yyyy HH:mm", {
                                locale: ptBR,
                              })}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>
                    ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Últimos Leads na Fila
                </Typography>
                <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                  {leads
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map((lead) => (
                      <Paper
                        key={lead.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          backgroundColor: "background.default",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box onClick={() => router.push(`/leads/${lead.id}`)} sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              {lead.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {lead.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", {
                                locale: ptBR,
                              })}
                            </Typography>
                          </Box>
                          <IconButton
                            onClick={() => router.push(`/leads/${lead.id}`)}
                            sx={{
                              color: "success.main",
                              "&:hover": {
                                backgroundColor: "success.light",
                              },
                            }}
                          >
                            <WhatsApp />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
} 