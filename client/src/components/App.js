import React from "react";
import Layout from './Layout';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005A3C",
    },
    secondary: {
      main: "#E1555A",
    },
    background: {
      default: "#B8D5D1",
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
});

function App() {
  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Layout />
    <Button variant="contained" color="primary" >Hello</Button>
  </ThemeProvider>
}

export default App;
