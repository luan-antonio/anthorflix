import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AnthorflixAPI from "./AnthorflixAPI";

import "./app.css";

import { Login } from "./pages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#96d518",
    },
  },
});

console.log(theme);
function App() {
  const anthor = new AnthorflixAPI();

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
