import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";

const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=your_actual_api_key&query=Inception";
const API_URL = "https://api.themoviedb.org/3/search/movie";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setMovies(data.results || []);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="border p-2 rounded w-full my-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="block border p-2 rounded">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mt-2 rounded"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  React.useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      {movie.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="mt-2 rounded" />
      )}
      <p className="mt-2">{movie.overview}</p>
      <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-500">
        View on IMDb
      </a>
      <Link to="/" className="block mt-4 text-blue-500">Back to search</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movie/:id"
          element={<MovieDetailWrapper />}
        />
      </Routes>
    </Router>
  );
};

const MovieDetailWrapper = () => {
  const { id } = useParams();
  return <MovieDetail movieId={id} />;
};

export default App;
