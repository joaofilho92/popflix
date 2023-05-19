import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieDetail.css";
import Card from "react-bootstrap/Card";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const releaseYear = movie.release_date.split("-")[0];

  return (
    <div className="movie-detail-container">
      <div className="div10">
        <h1>{movie.title}</h1>
        <Card.Subtitle className="year">{releaseYear}</Card.Subtitle>
        {/* ... */}
      </div>
    </div>
  );
};

export default MovieDetail;
