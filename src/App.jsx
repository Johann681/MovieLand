import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_KEY = "b6003d8a"; 
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      setMovies(data.Search || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching movies:", err.message);
      setError(err.message);
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <h1>Adekola's Movies</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {error && (
        <div className="error">
          <h2>{error}</h2>
        </div>
      )}

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      )}
    </div>
  );
};

export default App;
