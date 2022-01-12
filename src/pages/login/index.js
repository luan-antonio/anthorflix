import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import "./login.css";

export default () => {
  const navigate = useNavigate();
  const [loginLoad, setLoginLoad] = useState(true);
  const [signinLoad, setSigninLoad] = useState(false);
  return (
    <div className="login-page">
      <div className="login-page__card">
        <div className="login-page__anthor">
          <img src="/anthor-logo.png"></img>
        </div>
        <div className="login-page__form-container">
          <Stack spacing={2}>
            <h3>Log in</h3>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="primary"
              margin="dense"
            />
            <TextField
              id="senha"
              label="Senha"
              variant="outlined"
              color="primary"
              margin="dense"
            />
            <Button variant="contained" margin="dense" onClick={()=> setLoginLoad(!loginLoad)}>
                { loginLoad ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Button
              variant="outlined"
              margin="dense"
              onClick={()=> setSigninLoad(!signinLoad)}
            >
              { signinLoad ? <CircularProgress size={24} /> : 'Registrar-se'}
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};
