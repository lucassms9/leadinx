import { Grid, Paper, Typography, TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Save as SaveIcon, CheckCircle as CheckCircleIcon, RadioButtonUnchecked as RadioButtonUncheckedIcon } from "@mui/icons-material";
import { Lead } from "@/types/lead";

interface ReminderTabProps {
  lead: Lead;
  newReminder: {
    text: string;
    date: string;
  };
  onNewReminderChange: (field: "text" | "date", value: string) => void;
  onSave: () => void;
  onToggleReminder: (id: string) => void;
}

export default function ReminderTab({
  lead,
  newReminder,
  onNewReminderChange,
  onSave,
  onToggleReminder,
}: ReminderTabProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Novo Lembrete
          </Typography>
          <TextField
            fullWidth
            label="Lembrete"
            value={newReminder.text}
            onChange={(e) => onNewReminderChange("text", e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Data do Lembrete"
            value={newReminder.date ? newReminder.date.split('T')[0] : ""}
            onChange={(e) => onNewReminderChange("date", e.target.value + "T00:00:00Z")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={onSave}
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Lembretes Cadastrados
          </Typography>
          <List>
            {lead?.reminders?.map((reminder) => (
              <ListItem
                key={reminder.id}
                sx={{
                  backgroundColor: reminder.completed ? "rgba(0, 0, 0, 0.04)" : "background.paper",
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={reminder.text}
                  secondary={new Date(reminder.date).toLocaleDateString()}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => onToggleReminder(reminder.id)}
                  >
                    {reminder.completed ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
} 