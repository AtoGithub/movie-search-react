import "./MovieCard.css"
function MovieCard({movie, onSelectMovie}) {
    return (        
        <div className="movie-card" onClick={() => onSelectMovie(movie)}>
            <p>{movie.title}</p>
            {movie.poster ? (
                <img
                    className="movie-poster"
                    src={movie.poster}
                    alt={`${movie.title} movie poster`}
                />
                ) : (
                <div className="movie-poster-placeholder">
                    No poster available
                </div>
                )}
            <p>{movie.year}</p>
        </div>
    )}

export default MovieCard