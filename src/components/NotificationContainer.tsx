"use client";

import { Box } from "@mui/material";
import Notification from "./Notification";

interface NotificationContainerProps {
  children: React.ReactNode;
  drawerOpen: boolean;
}

export default function NotificationContainer({
  children,
  drawerOpen
}: NotificationContainerProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: drawerOpen ? 80 : 20,
        zIndex: 9999,
        height: "300px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: "0 20px",
        padding: "20px",

        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
      
      }}
    >
      {children}
    </Box>
  );
}
