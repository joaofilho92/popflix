import React, { useState, useEffect } from "react";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import "./SearchPage.css";
import MovieBox from "../../components/Cards/MovieBox/MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Button,
} from "react-bootstrap";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=d08dca53e8c642f369801f9213d0eb94";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=d08dca53e8c642f369801f9213d0eb94&query";


const SearchPage = () => {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=d08dca53e8c642f369801f9213d0eb94&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  return (
    <div>
      <MyNav />
      <Container className="container mt-3">
        <h1 className="headstyle">Cerca i tuoi film e serie preferiti</h1>
        <form onSubmit={searchMovie}>
          <input
            type="search"
            className="searchinp"
            placeholder="Movie Search"
            name="query"
            value={query}
            onChange={changeHandler}
          />
          <Button className="btn5" type="submit">
            Search
          </Button>
        </form>
        <div className="image-container d-flex mt-4 ">
          {movies.length > 0 ? (
            <div className="container ">
              <div className="grid grd1 ">
                {movies.map((movieReq) => (
                  <MovieBox key={movieReq.id} {...movieReq} />
                ))}
              </div>
            </div>
          ) : (
            <h2>Sorry !! No Movies Found</h2>
          )}
        </div>
      </Container>
      <MyFooter />
    </div>
  );
};

export default SearchPage;
