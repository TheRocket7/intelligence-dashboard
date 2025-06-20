import type React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

function ThemeWrapper(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
