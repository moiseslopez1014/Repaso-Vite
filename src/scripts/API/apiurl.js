import { API_KEY } from "./apikey.js"


export let baseURL = 'https://api.themoviedb.org/3/movie/'

export const popularMovies = `${baseURL}popular?api_key=${API_KEY}&language=es-ES&page=1`;

