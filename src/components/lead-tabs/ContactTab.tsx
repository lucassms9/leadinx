import { Grid, TextField, Button, Box } from "@mui/material";
import { Save as SaveIcon, Business as BusinessIcon, Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";
import { Lead } from "@/types/lead";

interface ContactTabProps {
  lead: Lead;
  onInputChange: (field: keyof Lead, value: string) => void;
  onSave: () => void;
}

export default function ContactTab({ lead, onInputChange, onSave }: ContactTabProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nome"
          value={lead.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="E-mail"
          value={lead.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Telefone"
          value={lead.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
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