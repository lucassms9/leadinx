export interface Message {
  id: string;
  date: string;
  type: "whatsapp" | "email" | "ligacao" | "visita";
  content: string;
  direction: "sent" | "received";
}

export interface Lead {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  stage?: "Aguardando" | "Em atendimento" | "Perdido";
  temperature?: string;
  source?: string;
  site?: string;
  socialMedia?: string;
  visit?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  messages?: Message[];
  status?:
    | "new"
    | "contacted"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed";
  interest?: string;
  product?: string;
  model?: string;
  value?: number;
  reminders?: {
    id: string;
    text: string;
    date: string;
    completed: boolean;
  }[];
  history?: {
    date: string;
    action: string;
  }[];
}
