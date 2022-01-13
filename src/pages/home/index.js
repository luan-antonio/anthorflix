import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import AnthorflixAPI from "../../AnthorflixAPI";
import MovieRow from "../../components/MovieRow";
import Header from "../../components/Header";

import homeState from "./homeState";
import "./home.css";
export default () => {
  const anthor = new AnthorflixAPI();
  const [
    {
      movieList,
      modal,
      disabledOK,
      disabledCancel,
      originalTitleError,
      originalTitle,
    },
    setState,
  ] = useState(homeState);

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getState = () => {
    return {
      movieList,
      modal,
      disabledOK,
      disabledCancel,
      originalTitleError,
      originalTitle,
    };
  };

  const handleCloseModal = () => {
    setState({
      ...getState(),
      modal: false,
    });
  };

  const handleFabClick = () => {
    setState({
      ...getState(),
      modal: true,
    });
  };

  const handleChangeOriginalTitle = (e) => {
    setState({
      ...getState(),
      originalTitle: e.target.value,
    });
  };

  const handleBlurOriginalTitle = () => {
    if (!validateOriginalTitle()) {
      setState({
        ...getState(),
        originalTitleError: true,
      });
      return;
    }
    setState({
      ...getState(),
      originalTitleError: false,
    });
  };

  const validateOriginalTitle = () => {
    return !!originalTitle;
  };

  const validateForm = () => {
    if (
      validateOriginalTitle()
    ) {
      setState({
        ...getState(),
        disabledCancel: false,
        disabledOK: false,
      });
      return;
    }
    setState({
      ...getState(),
      disabledCancel: true,
      disabledOK: false,
    });
  };

  const addMovie = async () => {
    const payload = { originalTitle }
    try {
      const res = await anthor.addMovie(payload);
    } catch (error) {
    }
  }

  useEffect(() => {
    const loadAll = async () => {
      const res = await anthor.getHomeList();
      setState({
        ...getState(),
        movieList: res.json,
      });
    };

    loadAll();
  }, []);

  useEffect(() => {
    validateForm();
  }, [originalTitle]);

  return (
    <div className="homepage">
      <Header />
      <section className="lists">
        <MovieRow movies={movieList}></MovieRow>
      </section>
      <Fab
        style={fabStyle}
        color="primary"
        aria-label="add"
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
      <Modal open={modal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>Adicionar um novo filme</h2>
          <TextField
            id="name"
            label="* Nome"
            variant="outlined"
            color="primary"
            margin="normal"
            size="small"
            type="text"
            fullWidth
            helperText="* o Nome é obrigatório"
            error={originalTitleError}
            onChange={handleChangeOriginalTitle}
            onBlur={handleBlurOriginalTitle}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button
              disabled={disabledCancel}
              variant="outlined"
              onClick={handleCloseModal}
            >
              CANCELAR
            </Button>
            <Button
              disabled={disabledOK}
              variant="contained"
              onClick={addMovie}
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
