//FETCH

import { API_KEY } from "./API/apikey.js";
import { baseURL } from "./API/apiurl.js";
import { sectionCredits } from "./main.js";

export async function getMovies(container, url) {
    container.innerHTML = ''; // Resetea el contenido del Div, evitando duplicados
    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error('Error de peticion ' + res.status);
        
        const data = await res.json();
        return showMovies(container, data);
    } catch (error) {
        console.log(error.message);
    }
}

// Recibe movies y crea una card para cada una

export function showMovies(container, movies) {
    movies.results.forEach(movie => {
        return container.appendChild(createMovieCard(movie));
    });
}

//funcion que crea las cards para las peliculas

export function createMovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movieDiv'; //crea un div con clase
    
    const moviePoster = document.createElement('img'); //crea imagen con la url de cada movie
    moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    moviePoster.setAttribute('movie-id', movie.id) //IMPORTANTE, ASIGNAMOS AQUI EL ID POR SI QUEREMOS RESCATAR ESTE VALOR PARA ESA PELICULA

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.original_title; // titulo 

    const movieInfo = document.createElement('p'); //Texto concatenado y formateado para year y rating
    movieInfo.textContent = `Year - ${movie.release_date.slice(0,4)} | Rating - ${movie.vote_average.toFixed(2)}`

    let movieInfoExtra; // declaramos un desplegable vacio
    let buttonForMore;

    movieDiv.appendChild(moviePoster);
    movieDiv.appendChild(movieTitle); // insertamos la info en la card
    movieDiv.appendChild(movieInfo);
    
    
    movieDiv.addEventListener('click', event => {  // vamos a hacer la card desplegable cuando clickamos
        
        if (!movieInfoExtra && !buttonForMore) { // si desplegable esta vacia
            
            movieInfoExtra = document.createElement('p');
            movieInfoExtra.textContent = movie.overview; // creamos un nuevo parrafo con sinopsis
            
            buttonForMore = document.createElement('a'); //Boton que crea una nueva seccion
            buttonForMore.className = 'buttonForMore';
            buttonForMore.textContent = '¡Saber más!';
            buttonForMore.setAttribute('href', '#sectionCredits')
            buttonForMore.addEventListener('click', event => { //Al hacer click en el boton
                event.stopPropagation();//nos aseguramos que no propague
                getMovieDetailed(moviePoster.getAttribute('movie-id')); //ejecutamos funcion que crea seccion con pelicula seleccionada, rescatando el ID de esta
            })
            
            movieDiv.appendChild(movieInfoExtra); //insertamos en la card
            movieDiv.appendChild(buttonForMore);

        }
        else {
            movieDiv.removeChild(buttonForMore);
            buttonForMore = null;
            movieDiv.removeChild(movieInfoExtra); // si al clickar de nuevo y ya tenemos el contenido, quitarlo
            movieInfoExtra = null; // y vaciamos de nuevo el desplegable
        }
    })

    return movieDiv; //SACAMOS EL RESULTADO DE LA CARD COMPLETA
}


// FETCH para el detalle de peliculas


export async function getMovieDetailed(movieID) {
    try {
        const res = await fetch(`${baseURL}${movieID}?api_key=${API_KEY}&language=es_ES`)
        if (!res.ok) throw new Error ('Error de peticion: ', res.status);
        const data = await res.json();
        return showDetails(data);
    } catch (error) {
        console.error(error.message);
    }
}



export function showDetails(movie) {
console.log(movie);
//credits poster

const creditsImg = document.createElement('img');
creditsImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
creditsImg.className = 'creditsIMG'

sectionCredits.appendChild(creditsImg);

//div credits

const creditsDiv = document.createElement('div');
creditsDiv.className = 'creditsDiv';

sectionCredits.appendChild(creditsDiv);

    //Credits titulo

    const creditsTitle = document.createElement('h2');
    creditsTitle.textContent = 'Bienvenido a pagina generica de peliculas #56486158162';

    creditsDiv.appendChild(creditsTitle);

    //credits sinopsis

    const creditsDescription = document.createElement('p');
    creditsDescription.textContent = 'Usa los menus de arriba para mostrar peliculas, seleccionalas para ver mas. Click en su boton para traer aqui sus creditos.'
    
    creditsDiv.appendChild(creditsDescription);

}