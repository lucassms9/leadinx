"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTheme as useAppTheme } from "@/contexts/ThemeContext";
import { useNotification } from "@/contexts/NotificationContext";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useAppTheme();
  const { showNotification } = useNotification();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Leads", icon: <PersonAddIcon />, path: "/leads" },
    { text: "Usuários", icon: <PeopleIcon />, path: "/users" },
    { text: "Configurações", icon: <SettingsIcon />, path: "/settings" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: drawerWidth },
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRM
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Divider />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
        {/* <button
          onClick={() => showNotification("Mensagem de sucesso!", "success")}
        >
          Mostrar Notificação de Sucesso
        </button>
        <button onClick={() => showNotification("Algo deu errado!", "error")}>
          Mostrar Notificação de Erro
        </button>
        <button
          onClick={() => showNotification("Informação importante", "info")}
        >
          Mostrar Notificação de Informação
        </button>
        <button onClick={() => showNotification("Atenção!", "warning")}>
          Mostrar Notificação de Atenção
        </button> */}
      </Box>
    </Box>
  );
}
