import "./Row.css";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // this is how we write an async function in useEffect
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) setTrailerUrl("");
    else {
      movieTrailer(movie?.original_title || movie?.title || movie?.name)
        .then((url) => {
          setTrailerUrl(url?.replace("watch?v=", "embed/"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <iframe
          src={trailerUrl}
          width="100%"
          height="500"
          className="movie-trailer"
        ></iframe>
      )}
    </div>
  );
};
