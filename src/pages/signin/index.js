import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";

import AnthorflixAPI from "../../AnthorflixAPI";
import signinState from "./signinState";
import "./signin.css";

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
      signinLoad,
      email,
      password,
      confirmPassword,
      name,
      emailErrorMessage,
      nameErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
      passwordError,
      emailError,
      nameError,
      confirmPasswordError,
      disableFormSubmit,
      modal,
      modalTitle,
      modalMsg,
    },
    setState,
  ] = useState(signinState);

  const getState = () => {
    return {
      signinLoad,
      email,
      password,
      confirmPassword,
      name,
      emailErrorMessage,
      nameErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
      passwordError,
      emailError,
      nameError,
      confirmPasswordError,
      disableFormSubmit,
    };
  };

  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const validateEmail = () => {
    return !!email && emailRegExp.test(email);
  };
  const validateConfirmPassword = () => {
    return !!confirmPassword && confirmPassword === password;
  };
  const validatePassword = () => {
    return !!password;
  };
  const validateName = () => {
    return !!name;
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
  const handleBlurConfirmPassword = () => {
    if (!confirmPassword) {
      setState({
        ...getState(),
        confirmPasswordErrorMessage: "* Este campo é obrigatório",
        confirmPasswordError: true,
      });
      return;
    }
    if (confirmPassword !== password) {
      setState({
        ...getState(),
        confirmPasswordErrorMessage: "* As senhas devem ser iguais",
        confirmPasswordError: true,
      });
      return;
    }
    setState({
      ...getState(),
      confirmPasswordErrorMessage: "",
      confirmPasswordError: false,
    });
  };
  const handleBlurName = () => {
    if (!validateName()) {
      setState({
        ...getState(),
        nameErrorMessage: "* O nome é obrigatório",
        nameError: true,
      });
      return;
    }
    setState({
      ...getState(),
      nameErrorMessage: "",
      nameError: false,
    });
  };

  const handleChangeName = (e) => {
    setState({
      ...getState(),
      name: e.target.value,
    });
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
  const handleChangeConfirmPassword = (e) => {
    setState({
      ...getState(),
      confirmPassword: e.target.value,
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
  const signin = async () => {
    setState({
      ...getState(),
      signinLoad: true,
    });
    const payload = {
      name,
      password,
      confirmPassword,
      email,
    };
    try {
      const res = await anthor.register(payload);
      if (res.status === 201) {
        setState({
          ...getState(),
          modal: true,
          modalTitle: "Parabéns",
          modalMsg: res.json.msg,
        });
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

  const validateForm = () => {
    if (
      validatePassword() &&
      validateName() &&
      validateEmail() &&
      validateConfirmPassword()
    ) {
      setState({
        ...getState(),
        disableFormSubmit: false,
      });
      return;
    }
    setState({
      ...getState(),
      disableFormSubmit: true,
    });
  };

  useEffect(() => {
    validateForm();
  }, [email, password, confirmPassword, name]);

  return (
    <div className="signin-page">
      <div className="signin-page__card">
        <div className="signin-page__anthor">
          <img src="/anthor-logo.png"></img>
        </div>
        <div className="signin-page__form-container">
          <Stack spacing={2} width={"80%"}>
            <h3>Sign in</h3>
            <TextField
              id="name"
              label="* Nome"
              variant="outlined"
              color="primary"
              margin="dense"
              size="small"
              type="text"
              fullWidth
              helperText={nameErrorMessage}
              error={nameError}
              onChange={handleChangeName}
              onBlur={handleBlurName}
            />
            <TextField
              id="email"
              label="* Email"
              variant="outlined"
              color="primary"
              margin="dense"
              size="small"
              type="text"
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
              size="small"
              type="password"
              fullWidth
              helperText={passwordErrorMessage}
              error={passwordError}
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
            />
            <TextField
              id="confirm-password"
              label="* Confirmação de senha"
              variant="outlined"
              color="primary"
              margin="dense"
              size="small"
              type="password"
              fullWidth
              helperText={confirmPasswordErrorMessage}
              error={confirmPasswordError}
              onChange={handleChangeConfirmPassword}
              onBlur={handleBlurConfirmPassword}
            />
            <Button
              variant={signinLoad ? "outlined" : "contained"}
              margin="dense"
              disabled={disableFormSubmit}
              onClick={signin}
            >
              {signinLoad ? (
                <CircularProgress size={24} thickness={4}/>
              ) : (
                "Registrar-se"
              )}
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
