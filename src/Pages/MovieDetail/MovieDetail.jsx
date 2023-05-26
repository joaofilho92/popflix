import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MovieDetail.css";
import AlsoLike from "../../components/Detail/AlsoLike/AlsoLike";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.results));

    fetch(`http://localhost:5000/comments`)
      .then((res) => res.json())
      .then((data) => data ? data.filter((comment)=> comment.movieId === id):[])
      .then((data) => setReviews(data));
  }, [id]);

  if (!movie || !cast || !videos) {
    return <div>Loading...</div>;
  }

  const releaseYear = movie.release_date.slice(0, 4);
  const voteAverage = Math.floor(movie.vote_average);

  function createReview (event){
    event.preventDefault();
    const content = event.target[0].value
    const author = sessionStorage.getItem('username')
    const review = {movieId:id, author:author, content:content}

    fetch("http://localhost:5000/comments", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },


      body: JSON.stringify(review),
    });
    window.location.reload();
  }



  return (
    <>
      <MyNav />
      {movie.backdrop_path && (
        <div className="posterImage with-shadow">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt="banner"
            className="img_02 img-fluid"
          />
        </div>
      )}
      <div className="container my-5 movie-details">
        <div className="row totale">
          <div className="col-lg-4 col-md-6 col-sm-12 postersize">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
              className="img-fluid movie_poster"
            />
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12">
            <h1 className="movie_title">{movie.title}</h1>
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
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </p>
            <p className="overview_01">{movie.overview}</p>
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
              {reviews.map((review) => (
                <div key={review.id} className="review-item mt-5">
                  <h3 className="author_review">{review.author}</h3>
                  <p className="review_content">{review.content}</p>
                </div>
              ))}
            </div>
            <form className="review-form" onSubmit={createReview}>
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
      <AlsoLike movieId={id} />
      <MyFooter />
    </>
  );
};

export default MovieDetails;
