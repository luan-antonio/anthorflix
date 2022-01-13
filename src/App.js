import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./app.css";

import { Login, Signin, Home, Movie } from "./pages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#96d518",
      dark: "#62a300",
      light: "#cbff57"
    },
  },
});
function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route exact path={'/movie'} element={<Movie/>}></Route>
            <Route path="/" element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
