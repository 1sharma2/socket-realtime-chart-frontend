import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import Chart from "./components/chart";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route path='/' exact component={Chart} />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
