'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeContextProvider>
          <NotificationProvider>
            <CssBaseline />
            {children}
          </NotificationProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
