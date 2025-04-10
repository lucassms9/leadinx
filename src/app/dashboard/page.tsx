'use client';

import { Grid, Paper, Typography, Box } from '@mui/material';
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

export default function DashboardPage() {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Leads', value: 150 },
    { title: 'Leads em Aberto', value: 45 },
    { title: 'Leads Atendidos', value: 85 },
    { title: 'Leads Descartados', value: 20 },
  ];

  return (
    <Layout>
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
    </Layout>
  );
} 