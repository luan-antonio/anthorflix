import React, { useEffect, useState } from "react";
import AnthorflixAPI from "../../AnthorflixAPI";
import "./movie.css";

export default () => {
  const [movieId, setMovieId] = useState();
  const [movieInfo, setMovieInfo] = useState();
  const anthor = new AnthorflixAPI();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMovieId(params.get("id"));
  }, []);

  useEffect(() => {
    const getMovieInfo = async () => {
      const res = await anthor.getMovieInfo(movieId);
      console.log(res)
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
            <p>Elenco: {movieInfo.cast.length === 0 ? 'Elenco não informado' : movieInfo.cast.map((person) => `${person.name}, `)}</p>
            <p>Diretores:  {movieInfo.directors.length === 0 ? 'Diretores não informados' : movieInfo.directors.map((person) => `${person.name}, `)}</p>
            <p>Gêneros:  {movieInfo.genres.length === 0 ? 'Gêneros não informados' : movieInfo.genres.map((genre) => `${genre.name}, `)}</p>
            <p>Roteiristas:  {movieInfo.writers.length === 0 ? 'Roteiristas não informados' : movieInfo.writers.map((person) => `${person.name}, `)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
