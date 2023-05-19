import React from 'react'
import MyNav from '../../components/MyNav/MyNav'
import MyFooter from '../../components/MyFooter/MyFooter'
import Banner from '../../components/Cards/Banner/Banner'
import Popular from '../../components/Cards/PopularMovies/Popular'
import TopRatedMovies from '../../components/Cards/TopRatedMovies/TopRatedMovies'
import PopularSeries from '../../components/Cards/PopularSeries/PopularSeries'
import TopRatedSeries from '../../components/Cards/TopRatedSeries/TopRatedSeries'
import './Home.css'


const Home = () => {
  return (
    <div>
      <MyNav/>
      <Banner/>
      <Popular/>
      <PopularSeries/>
      <TopRatedMovies/>
      <TopRatedSeries/>
      <MyFooter/>
    </div>
  )
}

export default Home
