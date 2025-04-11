export interface Lead {
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
  temperature: "Cinza" | "Amarelo" | "Vermelho";
  source: string;
  notes: string;
  interest: string;
  product: string;
  model: string;
  value: number;
  reminders: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
  }[];
  messages: Array<{
    id: string;
    date: string;
    type: "whatsapp" | "email" | "ligacao" | "visita";
    content: string;
    direction: "sent" | "received";
  }>;
  history: {
    id: string;
    type: string;
    description: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  site?: string;
  socialMedia?: string;
  visit?: string;
}
