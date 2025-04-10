import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#24D75F",
    },
    secondary: {
      main: "#150089",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#24D75F",
    },
    secondary: {
      main: "#150089",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
