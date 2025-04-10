'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Layout from '@/components/Layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/contexts/NotificationContext';

type LeadStatus = 'ALL' | 'DISCARDED' | 'OPEN' | 'ATTENDED';

export default function LeadsPage() {
  const [status, setStatus] = useState<LeadStatus>('ALL');
  const [consultant, setConsultant] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();
  const { showNotification } = useNotification();

  // Mock data for demonstration
  const leads = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'OPEN', consultant: 'Maria', date: '2024-04-01' },
    { id: 2, name: 'Ana Santos', email: 'ana@email.com', status: 'ATTENDED', consultant: 'Pedro', date: '2024-04-02' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com', status: 'DISCARDED', consultant: 'Maria', date: '2024-04-03' },
  ];

  const filteredLeads = leads.filter((lead) => {
    if (status !== 'ALL' && lead.status !== status) return false;
    if (consultant && !lead.consultant.toLowerCase().includes(consultant.toLowerCase())) return false;
    return true;
  });

  const handleLeadClick = (leadId: number) => {
    showNotification(`Lead ${leadId} selecionado`, 'success');
    router.push(`/leads/${leadId}`);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Leads
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <ButtonGroup variant="contained" aria-label="lead status filter">
            <Button
              onClick={() => setStatus('ALL')}
              color={status === 'ALL' ? 'primary' : 'inherit'}
            >
              Todos
            </Button>
            <Button
              onClick={() => setStatus('DISCARDED')}
              color={status === 'DISCARDED' ? 'primary' : 'inherit'}
            >
              Descartados
            </Button>
            <Button
              onClick={() => setStatus('OPEN')}
              color={status === 'OPEN' ? 'primary' : 'inherit'}
            >
              Em Aberto
            </Button>
            <Button
              onClick={() => setStatus('ATTENDED')}
              color={status === 'ATTENDED' ? 'primary' : 'inherit'}
            >
              Atendidos
            </Button>
          </ButtonGroup>

          <TextField
            label="Consultor"
            value={consultant}
            onChange={(e) => setConsultant(e.target.value)}
            size="small"
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data Inicial"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label="Data Final"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Consultor</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow 
                  key={lead.id}
                  onClick={() => handleLeadClick(lead.id)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.consultant}</TableCell>
                  <TableCell>{lead.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
} 