import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Nunito_Sans as NunitoSans, Raleway } from "next/font/google";

const nunitoSans = NunitoSans({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

const palette = {
  primary: {
    main: "#5b3854",
  },
  secondary: {
    main: "#39858a",
    light: "#2f748a",
    dark: "#001827",
  },
  grey: {
    main: "#60646d",
    dark: "#777777",
    darker: "#444444",
    light: "#9ca0a8",
    lighter: "#b0b0b0",
    lightest: "#eaeaea",
    logo: "#263743",
  },
};

const intelligenceDashboardTheme = createTheme({
  palette,
  typography: {
    fontFamily: nunitoSans.style.fontFamily,
    h1: {
      fontSize: "4rem",
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
      fontFamily: raleway.style.fontFamily,
      fontSize: "0.9rem",
      fontWeight: "700",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBottom: "2rem",
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: () => ({
          maxWidth: "410px !important",
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up("lg")]: {
            minWidth: "35vw",
          },
          [theme.breakpoints.only("md")]: {
            minWidth: "70vw",
          },
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
        root: ({ theme }) => ({
          [theme.breakpoints.down("md")]: {
            minWidth: "100%",
          },
        }),
      },
    },
  },
});

intelligenceDashboardTheme.typography.quote = {
  fontSize: "2rem",
  fontWeight: "200",
  lineHeight: "1.167",
};

export default responsiveFontSizes(intelligenceDashboardTheme);
