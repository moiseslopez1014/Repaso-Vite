import "../styles/style.scss";
import { getMovies } from "./utils.js";
import { popularMovies } from "./API/apiurl.js";

export const anchorElement = document.querySelector("#app");

//Titulo
const webTitle = document.createElement("h1");
webTitle.textContent = "Ejercicios de API - TMDb.org";

anchorElement.appendChild(webTitle);

//Seccion busqueda

const sectionSearch = document.createElement("section");
sectionSearch.className = "sectionSearch";

const inputSearch = document.createElement("input");
inputSearch.setAttribute("type", "text");
inputSearch.setAttribute("placeholder", "Encuentra una peli...");
inputSearch.className = "inputSearch";

const searchButton = document.createElement("button");
searchButton.setAttribute("type", "submit");
searchButton.textContent = "Buscar peli";
searchButton.className = "searchButton";

const sectionSearchSeparacion = document.createElement("hr");

const showAllButton = document.createElement("button");
showAllButton.textContent = "Mostrar todas las peliculas";
showAllButton.className = "showAllButton";

//busqueda appends
sectionSearch.appendChild(inputSearch);
sectionSearch.appendChild(searchButton);
sectionSearch.appendChild(sectionSearchSeparacion);
sectionSearch.appendChild(showAllButton);

anchorElement.appendChild(sectionSearch);

// Seccion cards

const sectionMovies = document.createElement("section");
sectionMovies.className = "sectionMovies";

anchorElement.appendChild(sectionMovies);

// busqueda funciones

showAllButton.addEventListener("click", (event) => {
  getMovies(sectionMovies, popularMovies);
});

//Section credits

export const sectionCredits = document.createElement("section");
sectionCredits.setAttribute("id", "sectionCredits");
sectionCredits.className = "sectionCredits";

anchorElement.appendChild(sectionCredits);
