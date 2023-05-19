import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PopularMovies/Popular.css";
import Box from "@mui/material/Box";

const TopRatedSeries = () => {
  const [TopRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setTopRatedSeries(data.results.slice(0, 5)));
  }, []);

  return (
    <div className="p-5 tp1">
      <h1 className="title3">Top Rated Series</h1>
      <Box
        sx={{
          width: 70,
          height: 5,
        }}
        className="box"
      />
      <div className="image-container d-flex justify-content-center flex-wrap mt-4">
        {TopRatedSeries.map((serie) => {
          const releaseYear = serie.first_air_date.split("-")[0];
          return (
            <Card className="movie-card mx-1 my-2">
              <Card.Img
                variant="top"
                className="card1"
                src={`https://image.tmdb.org/t/p/original${
                  serie && serie.poster_path
                }`}
              />
              <Card.Body className="card-body">
                <Card.Title className="title4">
                  {serie.vote_average}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="yellow"
                    className="bi bi-star-fill star"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </Card.Title>
                <Card.Title>{serie.name}</Card.Title>
                <Card.Subtitle className="year">{releaseYear}</Card.Subtitle>
                <button className="card_button01">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="white"
                    class="bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                </button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopRatedSeries;