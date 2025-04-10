"use client";

import { useState } from "react";
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
  Tabs,
  Tab,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  WhatsApp as WhatsAppIcon,
  Star as StarIcon,
  Source as SourceIcon,
  History as HistoryIcon,
  Note as NoteIcon,
  Notifications as NotificationsIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import Layout from "@/components/Layout";
import { useNotification } from "@/contexts/NotificationContext";
import ContactTab from "@/components/lead-tabs/ContactTab";
import HistoryTab from "@/components/lead-tabs/HistoryTab";
import ReminderTab from "@/components/lead-tabs/ReminderTab";
import NotesTab from "@/components/lead-tabs/NotesTab";

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
  stage: "Aguardando" | "Em atendimento" | "Perdido";
  temperature: string;
  source: string;
  notes: string;
  interest: string;
  product: string;
  model: string;
  value: number;
  reminders: Array<{
    id: string;
    text: string;
    date: string;
    completed: boolean;
  }>;
  messages: Array<{
    id: string;
    date: string;
    type: "whatsapp" | "email" | "ligacao" | "visita";
    content: string;
    direction: "sent" | "received";
  }>;
  history: Array<{
    date: string;
    action: string;
  }>;
  createdAt: string;
  updatedAt: string;
  site?: string;
  socialMedia?: string;
  visit?: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

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

export default function LeadDetails({ params }: PageProps) {
  const [tabValue, setTabValue] = useState(0);
  const [value, setValue] = useState(0);
  const { showNotification } = useNotification();

  // Mock data for demonstration
  const mockLead: Lead = {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    company: "Empresa XYZ",
    stage: "Aguardando",
    temperature: "Cinza",
    source: "Site",
    site: "www.empresa.com",
    socialMedia: "@empresa",
    visit: "Loja principal",
    notes: "Cliente interessado em produtos da linha premium",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T15:30:00Z",
    status: "new",
    interest: "Produtos de limpeza",
    product: "Detergente",
    model: "Premium",
    value: 29.99,
    messages: [
      {
        id: "1",
        date: "2024-01-01T10:00:00Z",
        type: "whatsapp",
        content: "Olá, gostaria de informações sobre seus produtos",
        direction: "received",
      },
      {
        id: "2",
        date: "2024-01-01T10:05:00Z",
        type: "whatsapp",
        content: "Claro! Em que posso ajudar?",
        direction: "sent",
      },
    ],
    reminders: [
      {
        id: "1",
        text: "Ligar para cliente",
        date: "2024-01-20T10:00:00Z",
        completed: false,
      },
    ],
    history: [
      {
        date: "2024-01-01T10:00:00Z",
        action: "Lead criado",
      },
      {
        date: "2024-01-15T15:30:00Z",
        action: "Atualização de status",
      },
    ],
  };

  // Mock data for products and models
  const products = [
    { id: "1", name: "Sedan" },
    { id: "2", name: "SUV" },
    { id: "3", name: "Hatch" },
    { id: "4", name: "Pickup" },
  ];

  const models = {
    "1": [
      { id: "1", name: "Comfort" },
      { id: "2", name: "Luxury" },
      { id: "3", name: "Sport" },
    ],
    "2": [
      { id: "1", name: "Compact" },
      { id: "2", name: "Mid-size" },
      { id: "3", name: "Full-size" },
    ],
    "3": [
      { id: "1", name: "Basic" },
      { id: "2", name: "Premium" },
      { id: "3", name: "GT" },
    ],
    "4": [
      { id: "1", name: "Standard" },
      { id: "2", name: "Off-road" },
      { id: "3", name: "Luxury" },
    ],
  };

  const [newReminder, setNewReminder] = useState({
    text: "",
    date: "",
  });

  const [newMessage, setNewMessage] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    if (newReminder.text && newReminder.date) {
      const newReminderObj = {
        id: Date.now().toString(),
        text: newReminder.text,
        date: newReminder.date,
        completed: false,
      };
      mockLead.reminders.push(newReminderObj);
      setNewReminder({ text: "", date: "" });
      showNotification("Lembrete adicionado com sucesso!", "success");
    }
  };

  const handleInputChange = <T extends keyof Lead>(
    field: T,
    value: Lead[T]
  ) => {
    mockLead[field] = value;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
    setValue(newValue);
    handleInputChange("value", newValue);
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

  const handleToggleReminder = (id: string) => {
    mockLead.reminders = mockLead.reminders.map((reminder) =>
      reminder.id === id
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: {
        id: string;
        date: string;
        type: "whatsapp" | "email" | "ligacao" | "visita";
        content: string;
        direction: "sent" | "received";
      } = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: "whatsapp",
        content: newMessage,
        direction: "sent",
      };
      mockLead.messages.push(newMessageObj);
      setNewMessage("");
      showNotification("Mensagem enviada com sucesso!", "success");
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
              {mockLead.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                {mockLead.name}
              </Typography>
              <Chip
                label={mockLead.status}
                color={getStatusColor(mockLead.status)}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
        </Box>

        <Paper
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tab icon={<PhoneIcon />} label="Contato" />
            <Tab icon={<StarIcon />} label="Interesse" />
            <Tab icon={<SourceIcon />} label="Fonte" />
            <Tab icon={<BusinessIcon />} label="Status" />
            <Tab icon={<HistoryIcon />} label="Histórico" />
            <Tab icon={<NoteIcon />} label="Observações" />
            <Tab icon={<NotificationsIcon />} label="Lembrete" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <ContactTab
              lead={mockLead}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Produto"
                  value={mockLead.product}
                  onChange={(e) => handleInputChange("product", e.target.value)}
                  margin="normal"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Modelo"
                  value={mockLead.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  margin="normal"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {(() => {
                    const currentProduct = products.find(
                      (p) => p.name === mockLead.product
                    );
                    const productId = currentProduct?.id || "1";
                    const availableModels =
                      models[productId as keyof typeof models] || [];
                    return availableModels.map((model) => (
                      <option key={model.id} value={model.name}>
                        {model.name}
                      </option>
                    ));
                  })()}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Valor"
                  type="number"
                  value={value}
                  onChange={handleValueChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: "R$ ",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Origem do lead"
                  value={mockLead.source}
                  onChange={(e) => handleInputChange("source", e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Site"
                  value={mockLead.site || ""}
                  onChange={(e) => handleInputChange("site", e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Redes sociais"
                  value={mockLead.socialMedia || ""}
                  onChange={(e) =>
                    handleInputChange("socialMedia", e.target.value)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Visita / Passagem"
                  value={mockLead.visit || ""}
                  onChange={(e) => handleInputChange("visit", e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Estágio do lead"
                  value={mockLead.stage}
                  onChange={(e) =>
                    handleInputChange("stage", e.target.value as Lead["stage"])
                  }
                  margin="normal"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="Aguardando">Aguardando</option>
                  <option value="Em atendimento">Em atendimento</option>
                  <option value="Perdido">Perdido</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Temperatura do lead"
                  value={mockLead.temperature}
                  onChange={(e) =>
                    handleInputChange("temperature", e.target.value)
                  }
                  margin="normal"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="Cinza">Cinza (frio)</option>
                  <option value="Amarelo">Amarelo (morno)</option>
                  <option value="Vermelho">Vermelho (quente)</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <HistoryTab
              lead={mockLead}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <NotesTab
              lead={mockLead}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={6}>
            <ReminderTab
              lead={mockLead}
              newReminder={newReminder}
              onNewReminderChange={(field, value) =>
                setNewReminder({ ...newReminder, [field]: value })
              }
              onSave={handleSave}
              onToggleReminder={handleToggleReminder}
            />
          </TabPanel>
        </Paper>
      </Box>
    </Layout>
  );
}
