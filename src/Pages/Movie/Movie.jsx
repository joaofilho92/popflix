import React from "react";
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import AllMovies from "../../components/Cards/AllMovies/AllMovies";

function Movie () {
  return (
    <div>
      <MyNav />
      <AllMovies/>
      <MyFooter />
    </div>
  );
}

export default Movie;
