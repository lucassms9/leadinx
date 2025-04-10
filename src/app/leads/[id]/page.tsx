'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import Layout from '@/components/Layout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for demonstration
  const lead = {
    id: params.id,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    interest: 'Produto X',
    source: 'Site',
    status: 'Em Aberto',
    history: [
      { date: '2024-04-01', action: 'Lead criado' },
      { date: '2024-04-02', action: 'Primeiro contato realizado' },
    ],
    observations: 'Cliente interessado em conhecer mais sobre o produto',
    reminder: 'Ligar novamente em 7 dias',
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Detalhes do Lead
        </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Contato" />
            <Tab label="Interesse" />
            <Tab label="Fonte" />
            <Tab label="Status" />
            <Tab label="Histórico" />
            <Tab label="Observações" />
            <Tab label="Lembrete" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={lead.name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={lead.email}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={lead.phone}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField
              fullWidth
              label="Interesse"
              value={lead.interest}
              margin="normal"
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <TextField
              fullWidth
              label="Fonte"
              value={lead.source}
              margin="normal"
            />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <TextField
              fullWidth
              label="Status"
              value={lead.status}
              margin="normal"
            />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            {lead.history.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2">{item.date}</Typography>
                <Typography>{item.action}</Typography>
              </Box>
            ))}
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Observações"
              value={lead.observations}
              margin="normal"
            />
          </TabPanel>

          <TabPanel value={tabValue} index={6}>
            <TextField
              fullWidth
              label="Lembrete"
              value={lead.reminder}
              margin="normal"
            />
          </TabPanel>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">
            Salvar
          </Button>
          <Button variant="outlined" color="secondary">
            Cancelar
          </Button>
        </Box>
      </Box>
    </Layout>
  );
} 