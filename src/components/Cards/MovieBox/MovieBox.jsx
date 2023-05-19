import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import './MovieBox.css'

const API_IMG = "https://image.tmdb.org/t/p/w500/";


const MovieBox = ({
    poster_path,
  }) => {
  
  return (
    <div className="image-container d-flex mt-4 div3">
      <Card className="movie-card mx-1 my-2">
        <Card.Img
          variant="top"
          className="card1 card2"
          src={API_IMG + poster_path}
        />
      </Card>
    </div>
  );
};

export default MovieBox;

