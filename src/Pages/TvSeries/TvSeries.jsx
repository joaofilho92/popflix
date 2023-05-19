import React from 'react'
import MyNav from "../../components/MyNav/MyNav";
import MyFooter from "../../components/MyFooter/MyFooter";
import AllTv from '../../components/Cards/AllTv/AllTv';

function TvSeries() {
  return (
    <div>
      <MyNav/>
      <AllTv/>
      <MyFooter/>
    </div>
  )
}

export default TvSeries
