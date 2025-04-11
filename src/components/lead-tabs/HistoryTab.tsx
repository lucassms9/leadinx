import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { Lead } from "@/types/lead";

interface HistoryTabProps {
  lead: Lead;
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function HistoryTab({
  lead,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}: HistoryTabProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Histórico de Mensagens
          </Typography>
          <Box sx={{ maxHeight: "60vh", overflowY: "auto", mb: 2 }}>
            {lead.messages.map((message) => (
              <Paper
                key={message.id}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor:
                    message.direction === "sent"
                      ? "rgba(25, 118, 210, 0.08)"
                      : "background.paper",
                  color: "text.primary",
                  maxWidth: "80%",
                  ml: message.direction === "sent" ? "auto" : 0,
                  position: "relative",
                  border:
                    message.direction === "sent"
                      ? "1px solid rgba(25, 118, 210, 0.2)"
                      : "1px solid rgba(0, 0, 0, 0.12)",
                  "@media (prefers-color-scheme: dark)": {
                    backgroundColor:
                      message.direction === "sent"
                        ? "rgba(25, 118, 210, 0.12)"
                        : "background.paper",
                    border:
                      message.direction === "sent"
                        ? "1px solid rgba(25, 118, 210, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  {new Date(message.date).toLocaleString()}
                </Typography>
                <Typography>{message.content}</Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Mensagem"
              value={newMessage}
              onChange={(e) => onNewMessageChange(e.target.value)}
              margin="normal"
            />
            <Box
              sx={{
                mt: 0,
                display: "flex",
                height: "50px",
                width: "50px",
                borderRadius: "25px",
              }}
            >
              <IconButton
                color="primary"
                onClick={onSendMessage}
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.default",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  width: "100%",
                  height: "100%",
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
