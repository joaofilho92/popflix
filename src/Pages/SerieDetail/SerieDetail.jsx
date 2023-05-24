import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SerieDetail.css";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SerieAlsoLike from "../../components/Detail/SerieAlsoLike/SerieAlsoLike";

const SerieDetails = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [cast, setCast] = useState(null);
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setSerie(data));

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast));

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.results));

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.results));
  }, [id]);

  if (!serie || !cast || !videos || !reviews) {
    return <div>Loading...</div>;
  }

  const releaseYear = serie.first_air_date.slice(0, 4);
  const voteAverage = Math.floor(serie.vote_average);

  return (
    <>
      <MyNav />
      {serie.backdrop_path && (
        <div className="posterImage with-shadow">
          <img
            src={`https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`}
            alt="banner"
            className="img_02"
          />
        </div>
      )}
      <div className="container my-5 serie-details">
        <div className="row totale">
          <div className="col-md-4 postersize">
            <img
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt="poster"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h1 className="serie_title">{serie.name}</h1>
            <p>
              <span className="release-year">{releaseYear}</span>
              <span className="vote-average">
                {voteAverage}
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
              {serie.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </p>
            <p className="overview_01">{serie.overview}</p>
            <div className="row cast-section">
              <h2 className="Title_01">
                Cast
                <Box
                  sx={{
                    width: 100,
                    height: 5,
                  }}
                  className="box_01"
                />
              </h2>
              {cast.slice(0, 4).map((actor) => (
                <div key={actor.id} className="col-md-3 col-sm-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={`${actor.name} foto`}
                    className="img-fluid imgActor"
                  />
                  <p>{actor.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="video-section">
            <h2 className="title_03">
              Videos{" "}
              <Box
                sx={{
                  width: 100,
                  height: 5,
                }}
                className="box_01"
              />
            </h2>
            <Carousel
              autoPlay={false}
              interval={3800}
              infiniteLoop={true}
              showStatus={false}
              showArrows={false}
              showIndicators={false}
              width="100%"
            >
              {videos.map((video) => (
                <div key={video.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="5"
                    allowFullScreen
                    className="vid01"
                  ></iframe>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Reviews */}

          <div className="review-section">
            <h2 className="title_03">
              Reviews
              <Box
                sx={{
                  width: 100,
                  height: 5,
                }}
                className="box_01"
              />
            </h2>
            <div className="review-list">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="review-item mt-5">
                  <h3 className="author_review">{review.author}</h3>
                  <p className="review_content">{review.content}</p>
                </div>
              ))}
            </div>
            <form className="review-form">
              <h3 className="review_01">Write a Review</h3>
              <textarea
                rows="4"
                placeholder="Write your review here..."
                className="coment_form"
              ></textarea>
              <button type="submit" className="btn_05">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <SerieAlsoLike seriesId={id} />
      <MyFooter />
    </>
  );
};

export default SerieDetails;