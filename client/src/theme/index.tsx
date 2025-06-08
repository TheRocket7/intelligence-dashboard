import {
  createTheme,
  responsiveFontSizes,
  type PaletteOptions,
} from "@mui/material/styles";

const palette: PaletteOptions = {
  primary: {
    main: "#5b3854",
  },
  secondary: {
    main: "#39858a",
    light: "#2f748a",
    dark: "#001827",
  },
};

const intelligenceDashboardTheme = createTheme({
  palette,
  typography: {
    h1: {
      fontSize: "3.25rem",
      fontWeight: "600",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: "300",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "2rem",
      fontWeight: "200",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "400",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "400",
    },
    body2: {
      fontSize: "1rem",
      fontWeight: "700",
    },
    subtitle1: {
      fontSize: "0.75rem",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: "600",
    },
    button: {
      fontSize: "0.9rem",
      fontWeight: "700",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: () => ({
          paddingBottom: "2rem",
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: () => ({
          padding: "1rem",
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: () => ({
          padding: "0 1.5rem 1rem",
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            minWidth: "90%",
          },
          [theme.breakpoints.up("sm")]: {
            minWidth: "50rem",
          },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          height: "36px",
        }),
      },
    },
  },
});

const theme = responsiveFontSizes(intelligenceDashboardTheme);
export default theme;
