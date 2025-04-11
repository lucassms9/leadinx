import { Grid, TextField, Button, Box } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { Lead } from "@/types/lead";

interface NotesTabProps {
  lead: Lead;
  onInputChange: (field: keyof Lead, value: string) => void;
  onSave: () => void;
}

export default function NotesTab({ lead, onInputChange, onSave }: NotesTabProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Observações"
          value={lead.notes}
          onChange={(e) => onInputChange("notes", e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
} 