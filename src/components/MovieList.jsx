import MovieCard from "./MovieCard"
import "./MovieList.css"
function MovieList ({movies, onSelectMovie}) {
    return(
        <div className="movie-list">
            {movies.map((movie)=>(
                <MovieCard key={movie.id} 
                           movie={movie} 
                           onSelectMovie={onSelectMovie} 
                />
            ))}
        </div>
    )
}

export default MovieList