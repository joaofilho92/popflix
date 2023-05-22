import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SerieAlsoLike.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const SerieAlsoLike = ({ seriesId }) => {
  const [relatedSeries, setRelatedSeries] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setRelatedSeries(data.results.slice(0, 5)));
  }, [seriesId]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="AlsoLike p-5 first2">
      <h1 className="title_01">You may also Like</h1>
      <Box
        sx={{
          width: 70,
          height: 5,
        }}
        className="box_01"
      />
      <div className="image-container d-flex justify-content-center flex-wrap mt-4">
        {relatedSeries.map((series) => {
          const releaseYear = series.first_air_date.split("-")[0];
          return (
            <Card className="movie-card mx-1 my-2">
              <Card.Img
                variant="top"
                className="card_01"
                src={`https://image.tmdb.org/t/p/original${
                  series && series.poster_path
                }`}
              />
              <Card.Body className="card-body">
                <Card.Title className="title_04">
                  {series.vote_average.toFixed(2)}{" "}
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
                <Card.Title>{series.name}</Card.Title>
                <Card.Subtitle className="year">{releaseYear}</Card.Subtitle>
                <Link to={`/series/${series.id}`}>
                  <button
                    className="PlayButtonCard"
                    onClick={handleScrollToTop}
                  >
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
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SerieAlsoLike;
