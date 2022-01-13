import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnthorflixAPI from "../../AnthorflixAPI";
import "./movie.css";

export default () => {
  const [movieId, setMovieId] = useState();
  const [movieInfo, setMovieInfo] = useState();
  const navigate = useNavigate();
  const deleteStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "absolute",
  };
  const anthor = new AnthorflixAPI();

  const deleteMovie = async() => {
    const res = await anthor.deleteMovie(movieId);
    navigate("/")
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMovieId(params.get("id"));
  }, []);

  useEffect(() => {
    const getMovieInfo = async () => {
      const res = await anthor.getMovieInfo(movieId);
      console.log(res);
      if (res.status === 200) {
        setMovieInfo(res.json);
      }
    };

    getMovieInfo();
  }, [movieId]);
  return (
    <div className="moviepage">
      <div className="moviepage__card">
        <div className="moviepage__movie-poster">
          <img src="/anthor-logo.png"></img>
        </div>
        {movieInfo && (
          <div className="moviepage__info-container">
            <p>Titulo: {movieInfo.title || movieInfo.originalTitle}</p>
            <p>Status: {movieInfo.status}</p>
            <p>
              Elenco:{" "}
              {movieInfo.cast.length === 0
                ? "Elenco não informado"
                : movieInfo.cast.map((person) => `${person.name}, `)}
            </p>
            <p>
              Diretores:{" "}
              {movieInfo.directors.length === 0
                ? "Diretores não informados"
                : movieInfo.directors.map((person) => `${person.name}, `)}
            </p>
            <p>
              Gêneros:{" "}
              {movieInfo.genres.length === 0
                ? "Gêneros não informados"
                : movieInfo.genres.map((genre) => `${genre.name}, `)}
            </p>
            <p>
              Roteiristas:{" "}
              {movieInfo.writers.length === 0
                ? "Roteiristas não informados"
                : movieInfo.writers.map((person) => `${person.name}, `)}
            </p>
            <Button style={deleteStyle} variant="contained" onClick={deleteMovie}>Excluir filme</Button>
          </div>
        )}
      </div>
    </div>
  );
};
