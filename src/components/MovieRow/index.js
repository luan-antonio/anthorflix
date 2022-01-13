import React, { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "./MovieRow.css";
import movieRowState from "./movieRowState";

export default ({ movies }) => {
  const [{ scrollX }, setState] = useState(movieRowState);

  const getState = () => {
    return {
      scrollX,
    };
  };

  const handleLeftArrow = () => {
    const x =
      scrollX + Math.round(window.innerWidth / 2) > 0
        ? 0
        : scrollX + Math.round(window.innerWidth / 2);
    setState({
      ...getState(),
      scrollX: x,
    });
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = movies.length * 200;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 90;
      setState({
        ...getState(),
      });
    }
    setState({
      ...getState(),
      scrollX: x,
    });
  };

  return (
    <div className="movie-row">
      <div className="movie-row__left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movie-row__list-area">
        <div
          className="movie-row__list"
          style={{
            marginLeft: scrollX,
          }}
        >
          {movies.length > 0 &&
            movies.map((movie) => {
              return (
                <div className="movie-row__movie" key={movie._id}>
                  <img
                    src={
                      movie.poster_path
                        ? movie.poster_path
                        : "/movie-placeholder.jpg"
                    }
                    alt={movie.original_title}
                  />
                  <div className="movie-row__movie-title">
                    <p>{movie.title}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="movie-row__right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
    </div>
  );
};
