import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card } from "react-bootstrap";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/multi?api_key=d08dca53e8c642f369801f9213d0eb94&query=";

const SearchPage = () => {
  const [media, setMedia] = useState([]);
  const [query, setQuery] = useState("");

  const searchMedia = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_SEARCH}=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMedia(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <MyNav />
      <Container className="mt-3">
        <h1 className="headstyle">Search for movies and TV shows</h1>
        <form onSubmit={searchMedia}>
          <input
            type="search"
            className="searchinp"
            placeholder="Search for a movie or TV show..."
            name="query"
            value={query}
            onChange={handleInputChange}
          />
          <Button className="btn5" type="submit">
            Search
          </Button>
        </form>
        <div className="image-container d-flex mt-4 ">
          <div className="container  ">
            <div className="grid grd1">
              {media.map((media) => (
                <Card className="movie-card mx-1 my-2 card1 card2">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="title_02">
                      {media.title || media.name}
                    </Card.Title>
                    <Link
                      to={`/${
                        media.media_type === "movie" ? "movies" : "series"
                      }/${media.id}`}
                    >
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
                    </Link>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <MyFooter />
      </Container>
    </div>
  );
};

export default SearchPage;
