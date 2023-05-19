import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './SerieDetail.css';

const SerieDetails = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=d08dca53e8c642f369801f9213d0eb94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setSerie(data));
  }, [id]);

  if (!serie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{serie.name}</h1>
      <p>{serie.overview}</p>
      {/* ... */}
    </div>
  );
};

export default SerieDetails;
