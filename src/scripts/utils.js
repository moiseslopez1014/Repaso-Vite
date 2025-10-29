import { trendingMovies } from './API/apiurl.js';



export async function getMovies(container) {
    try {
        const res = await fetch(trendingMovies);
        if (!res.ok) throw new Error('Error de peticion ' + res.status);
        const data = await res.json();
        return showMovies(container, data);
    } catch (error) {
        console.log(error.message);
    }
}

export function showMovies(container, movies) {
    movies.results.forEach(movie => {
        return container.appendChild(createMovieCard(movie));
    });
}

export function createMovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movieDiv';
    
    const moviePoster = document.createElement('img');
    moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    moviePoster.setAttribute('movie-id', movie.id)

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.original_title;

    const movieInfo = document.createElement('p');
    movieInfo.textContent = `Year - ${movie.release_date.slice(0,4)} | Rating - ${movie.vote_average.toFixed(2)}`

    let movieInfoExtra;
    
    movieDiv.appendChild(moviePoster);
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieInfo);
    
    
    movieDiv.addEventListener('click', event => {
        
        if (!movieInfoExtra) {
            
            movieInfoExtra = document.createElement('p');
            movieInfoExtra.textContent = movie.overview;
            
            movieDiv.appendChild(movieInfoExtra);

        }
        else {
            movieDiv.removeChild(movieInfoExtra);
            movieInfoExtra = null;
        }
    })

    console.log(movie);
    return movieDiv;
}

