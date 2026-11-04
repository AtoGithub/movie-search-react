import { useState } from 'react'
import './App.css'
import MovieList from "./components/MovieList";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  async function searchMovies() {
        if (!query.trim()) {
              return;
            }    
            
        setError(null);
        setLoading(true);
     try{
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

          if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

            const data = await response.json();
          
          const formattedMovies = data.results.filter((movie) => movie.id && movie.title && movie.title.trim()).map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null,
          year: movie.release_date  ? movie.release_date.slice(0, 4)
                : "Unknown year",
          details: movie.overview || "No details available",
        }));
         
          setMovies(formattedMovies);
          setHasSearched(true);
          setSelectedMovie(null);
    }catch(error){
      setError(error.message);
    }finally {
  setLoading(false);
}
  
}

function handleSelectMovie(movie) {
     console.log("Clicked movie:", movie.title);
    setSelectedMovie(movie);
}

  return (
    
      <main className="app">
        <header className="app-header">
                  <h1>CatchMovie</h1>
                  <p>Find your next movie night.</p>
        </header>

        <div className="search-container">
          <input
            className='input-container'
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button onClick={searchMovies} className='search-btn'>Search</button>
          {loading && <p className="status-message">Searching movies...</p>}
        </div>

        {selectedMovie && (
            <div className='selected-movie'>
                  <h2 className="selected-heading">Selected Movie</h2>
                  <div className='selected-poster'>
                    {selectedMovie.poster && (
                    <img
                      src={selectedMovie.poster}
                      alt={selectedMovie.title}
                    />
                    )
                  }
                  </div>
                  <div className='selected-info'>
                    <p className="selected-title">{selectedMovie.title}</p>
                    <p className="selected-year">{selectedMovie.year}</p>
                    <p className="selected-details">{selectedMovie.details}</p>
                  </div>
                  
            </div>
         )}

        <MovieList 
              movies={movies} 
              onSelectMovie={handleSelectMovie}
        />

      

        {!hasSearched && !loading && (
          <p className="status-message">Search for a movie to get started.</p>
        )}

        {hasSearched && movies.length === 0 && !loading && !error && (
          <p className="status-message">No movies found. Try another search.</p>
        )}
         {error && <p className="error-message">{error}</p>}

      </main>
    
  )
}

export default App
