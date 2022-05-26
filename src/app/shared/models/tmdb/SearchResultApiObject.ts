import {MovieSearchApiObject} from "./MovieSearchApiObject";

export interface SearchResultApiObject {
  page: number,
  results: MovieSearchApiObject[],
  total_results: number,
  total_pages: number
}
