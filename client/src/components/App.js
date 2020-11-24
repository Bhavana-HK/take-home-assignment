import React from "react";
import Layout from './Layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005A3C",
    },
    secondary: {
      main: "#E1555A",
    },
    background: {
      default: "#e9f0f0",
      paper: "#ffff"
    },
    text: {
      primary: "#515562"
    },
  },
  typography:{
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
    button:{
      textTransform: 'none',
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  // shadows: ["none"]
});

function App() {
  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Layout />
  </ThemeProvider>
}

export default App;
