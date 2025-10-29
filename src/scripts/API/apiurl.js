import { API_KEY } from "./apikey.js"


let baseURL = 'https://api.themoviedb.org/3/movie/'

export const trendingMovies = `${baseURL}popular?api_key=${API_KEY}&language=en-US&page=1`;

