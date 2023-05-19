import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SearchPage from './Pages/SearchPage/SearchPage';
import Movie from './Pages/Movie/Movie';
import TvSeries from './Pages/TvSeries/TvSeries';
import SerieDetails from './Pages/SerieDetail/SerieDetail';
import MovieDetail from './Pages/MovieDetail/MovieDetail';


function App() {
  return (
    // Rotas
    <>
      <ToastContainer theme="dark" autoClose="1000"></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/TvSeries" element={<TvSeries />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/series/:id" element={<SerieDetails />} />
          <Route path="/movies/:id" component={<MovieDetail/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
