//FETCH

import { API_KEY } from "./API/apikey.js";
import { baseURL } from "./API/apiurl.js";
import { sectionCredits } from "./main.js";

export async function getMovies(container, url) {
  container.innerHTML = ""; // Resetea el contenido del Div, evitando duplicados
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Error de peticion " + res.status);

    const data = await res.json();
    return showMovies(container, data);
  } catch (error) {
    console.log(error.message);
  }
}

// Recibe movies y crea una card para cada una

export function showMovies(container, movies) {
  movies.results.forEach((movie) => {
    return container.appendChild(createMovieCard(movie));
  });
}

//funcion que crea las cards para las peliculas

export function createMovieCard(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.className = "movieDiv"; //crea un div con clase

  const moviePoster = document.createElement("img"); //crea imagen con la url de cada movie
  moviePoster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  );
  moviePoster.setAttribute("movie-id", movie.id); //IMPORTANTE, ASIGNAMOS AQUI EL ID POR SI QUEREMOS RESCATAR ESTE VALOR PARA ESA PELICULA

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.original_title; // titulo

  const movieInfo = document.createElement("p"); //Texto concatenado y formateado para year y rating
  movieInfo.textContent = `Year - ${movie.release_date.slice(
    0,
    4
  )} | Rating - ${movie.vote_average.toFixed(2)}`;

  let movieInfoExtra; // declaramos un desplegable vacio
  let buttonForMore;

  movieDiv.appendChild(moviePoster);
  movieDiv.appendChild(movieTitle); // insertamos la info en la card
  movieDiv.appendChild(movieInfo);

  movieDiv.addEventListener("click", (event) => {
    // vamos a hacer la card desplegable cuando clickamos

    if (!movieInfoExtra && !buttonForMore) {
      // si desplegable esta vacia

      movieInfoExtra = document.createElement("p");
      movieInfoExtra.textContent = movie.overview; // creamos un nuevo parrafo con sinopsis

      buttonForMore = document.createElement("a"); //Boton que crea una nueva seccion
      buttonForMore.className = "buttonForMore";
      buttonForMore.textContent = "¡Saber más!";
      buttonForMore.setAttribute("href", "#sectionCredits");
      buttonForMore.addEventListener("click", (event) => {
        //Al hacer click en el boton
        event.stopPropagation(); //nos aseguramos que no propague
        getMovieDetailed(moviePoster.getAttribute("movie-id")); //ejecutamos funcion que crea seccion con pelicula seleccionada, rescatando el ID de esta
      });

      movieDiv.appendChild(movieInfoExtra); //insertamos en la card
      movieDiv.appendChild(buttonForMore);
    } else {
      movieDiv.removeChild(buttonForMore);
      buttonForMore = null;
      movieDiv.removeChild(movieInfoExtra); // si al clickar de nuevo y ya tenemos el contenido, quitarlo
      movieInfoExtra = null; // y vaciamos de nuevo el desplegable
    }
  });

  return movieDiv; //SACAMOS EL RESULTADO DE LA CARD COMPLETA
}

// FETCH para el detalle de peliculas

export async function getMovieDetailed(movieID) {
  try {
    const res = await fetch(
      `${baseURL}${movieID}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`
    );
    if (!res.ok) throw new Error("Error de peticion: ", res.status);
    const data = await res.json();
    return showDetails(data);
  } catch (error) {
    console.error(error.message);
  }
}

export function showDetails(movie) {
  console.log(movie);
  //credits poster

  sectionCredits.innerHTML = "";

  const creditsImg = document.createElement("img");
  if (movie.poster_path === null) {
    creditsImg.setAttribute("src", "../../imgs/logomovies.png");
  } else {
    creditsImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );
  }
  creditsImg.className = "creditsIMG";

  sectionCredits.appendChild(creditsImg);

  //div credits

  const creditsDiv = document.createElement("div");
  creditsDiv.className = "creditsDiv";

  sectionCredits.appendChild(creditsDiv);

  //Credits titulo

  const creditsTitle = document.createElement("h2");
  creditsTitle.textContent = movie.title;

  creditsDiv.appendChild(creditsTitle);

  //credits sinopsis

  const creditsDescription = document.createElement("p");
  creditsDescription.textContent = movie.overview;

  creditsDiv.appendChild(creditsDescription);

  //DIV FOR CASTING

  const creditsCastingDiv = document.createElement("div");
  creditsCastingDiv.className = "creditsCastingDiv";

  creditsDiv.appendChild(creditsCastingDiv);

  //DIV FOR ACTOR

  movie.credits.cast.forEach((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.className = "actorDiv";

    creditsCastingDiv.appendChild(actorDiv);

    const actorPortrait = document.createElement("img");
    if (actor.profile_path === null) {
      actorPortrait.setAttribute("src", "../../imgs/actorNotFound.png");
    } else {
      actorPortrait.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w300${actor.profile_path}`
      );
    }

    actorDiv.appendChild(actorPortrait);

    const actorName = document.createElement("p");
    actorName.textContent = actor.name;

    actorDiv.appendChild(actorName);

    const separasion = document.createElement("hr");

    actorDiv.appendChild(separasion);

    const actorChar = document.createElement("p");
    actorChar.textContent = actor.character;

    actorDiv.appendChild(actorChar);
  });
}
