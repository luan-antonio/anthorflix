import React, { useState, useEffect } from "react";

import AnthorflixAPI from "../../AnthorflixAPI";
import MovieRow from "../../components/MovieRow";
import Header from '../../components/Header';

import homeState from "./homeState";
import "./home.css"
export default () => {
  const anthor = new AnthorflixAPI();
  const [{ movieList }, setValues] = useState(homeState);

  const getState = () => {
    return {
      movieList,
    };
  };

  useEffect(() => {
    const loadAll = async () => {
      const res = await anthor.getHomeList();
      setValues({
        ...getState(),
        movieList: res.json,
      });
    };

    loadAll();
  }, []);

  return (
    <div className="homepage">
      <Header/>
      <section className="lists">
        <MovieRow movies={movieList}></MovieRow>
      </section>
    </div>
  );
};
