import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";


import "./login.css";
import AnthorflixAPI from "../../AnthorflixAPI";
import loginState from "./loginState";

export default () => {
  const navigate = useNavigate();
  const anthor = new AnthorflixAPI();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [
    {
      loginLoad,
      email,
      emailErrorMessage,
      emailError,
      password,
      passwordErrorMessage,
      passwordError,
      disableButtons,
      modal,
      modalTitle,
      modalMsg,
    },
    setState,
  ] = useState(loginState);

  const getState = () => {
    return {
      loginLoad,
      email,
      emailErrorMessage,
      emailError,
      password,
      passwordErrorMessage,
      passwordError,
      disableButtons,
      modal,
      modalTitle,
      modalMsg,
    };
  };

  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const validatePassword = () => {
    return !!password;
  };
  const handleChangeEmail = (e) => {
    setState({
      ...getState(),
      email: e.target.value,
    });
  };
  const handleChangePassword = (e) => {
    setState({
      ...getState(),
      password: e.target.value,
    });
  };
  const handleBlurPassword = () => {
    if (!validatePassword()) {
      setState({
        ...getState(),
        passwordErrorMessage: "* Este campo é obrigatório",
        passwordError: true,
      });
      return;
    }
    setState({
      ...getState(),
      passwordErrorMessage: "",
      passwordError: false,
    });
  };
  const handleBlurEmail = () => {
    if (!email) {
      setState({
        ...getState(),
        emailErrorMessage: "* Este campo é obrigatório",
        emailError: true,
      });
      return;
    }
    if (!emailRegExp.test(email)) {
      setState({
        ...getState(),
        emailErrorMessage: "* Insira um Email válido como joe@gmail.com",
        emailError: true,
      });
      return;
    }
    setState({
      ...getState(),
      emailErrorMessage: "",
      emailError: false,
    });
  };
  const handleCloseModal = () => {
    setState({
      ...getState(),
      modal: false,
    });
    if (modalTitle === "Parabéns") {
      navigate("/login");
    }
  };
  const login = async () => {
    setState({
      ...getState(),
      loginLoad: true,
      disableButtons: true,
    });
    const payload = {
      email,
      password,
    };
    try {
      const res = await anthor.login(payload);
      if (res.status === 200) {
        sessionStorage.setItem('token', res.json.token);
        anthor.setTokenOnHeaders();
        navigate("/");
      } else {
        setState({
          ...getState(),
          modal: true,
          modalTitle: "Erro",
          modalMsg: res.json.msg,
        });
      }
    } catch (error) {
      setState({
        ...getState(),
        modal: true,
        modalTitle: "Erro",
        modalMsg: error,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__card">
        <div className="login-page__anthor">
          <img src="/anthor-logo.png"></img>
        </div>
        <div className="login-page__form-container">
          <Stack spacing={2} width={"80%"}>
            <h3>Log in</h3>
            <TextField
              id="email"
              label="* Email"
              variant="outlined"
              color="primary"
              margin="dense"
              fullWidth
              helperText={emailErrorMessage}
              error={emailError}
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
            />
            <TextField
              id="password"
              label="* Senha"
              variant="outlined"
              color="primary"
              margin="dense"
              type="password"
              fullWidth
              helperText={passwordErrorMessage}
              error={passwordError}
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
            />
            <Button
              disabled={disableButtons}
              variant={loginLoad ? "outlined" : "contained"}
              margin="dense"
              onClick={login}
            >
              {loginLoad ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Button
              variant="outlined"
              margin="dense"
              disabled={disableButtons}
              onClick={() => navigate("/signin")}
            >
              Registrar-se
            </Button>
          </Stack>
        </div>
      </div>
      <Modal open={modal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>{modalTitle}</h2>
          <p>{modalMsg}</p>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={handleCloseModal}>
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
