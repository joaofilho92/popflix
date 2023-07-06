import React, { useEffect, useState } from "react";
import "./Banner.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US"
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  const getGenres = (genreIds) => {
    const movieGenres = genres
      .filter((genre) => genreIds.includes(genre.id))
      .slice(0, 3)
      .map((genre) => (
        <span key={genre.id} className="genre">
          {genre.name}
        </span>
      ));

    return movieGenres;
  };

  return (
    <>
      <div className="poster">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={4000}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          stopOnHover={false}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movies/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  alt="Movie_banner_img"
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? new Date(movie.release_date).getFullYear() : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
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
                  </span>
                  {movie ? getGenres(movie.genre_ids) : ""}
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
