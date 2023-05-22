import React, { useState } from "react";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import "./SearchPage.css";
import MovieBox from "../../components/Cards/MovieBox/MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/multi?api_key=d08dca53e8c642f369801f9213d0eb94&query";

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
      <Container className="container mt-3">
        <h1 className="headstyle">Cerca i tuoi film e serie preferiti</h1>
        <form onSubmit={searchMedia}>
          <input
            type="search"
            className="searchinp"
            placeholder="Movie or TV Show Search"
            name="query"
            value={query}
            onChange={handleInputChange}
          />
          <Button className="btn5" type="submit">
            Search
          </Button>
        </form>
        <div className="image-container d-flex mt-4 ">
          {media.length > 0 ? (
            <div className="container ">
              <div className="grid grd1">
                {media.map((mediaReq) => (
                  <MovieBox key={mediaReq.id} {...mediaReq} />
                ))}
              </div>
            </div>
          ) : (
            <h2>Sorry !! No Movies or TV Shows Found</h2>
          )}
        </div>
      </Container>
      <MyFooter />
    </div>
  );
};

export default SearchPage;
