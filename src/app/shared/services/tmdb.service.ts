import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

export interface SearchResultApiObject {
  page: number,
  results: MovieApiObject[],
  total_results: number,
  total_pages: number
}

export interface MovieApiObject {
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number
}

export interface MovieCreditsApiObject {
  id: number,
  cast: CastApiObject[],
  crew: CrewApiObject[],
}

export interface CastApiObject {
  adult: boolean,
  gender: number | null,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string | null,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

export interface CrewApiObject {
  adult: boolean,
  gender: number | null,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string | null,
  credit_id: string,
  job: string
}
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  public baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '1629f55fe2e85b91bf3b83337f2a7291';

  constructor(private httpClient: HttpClient) { }
  public searchMovies(searchText: string): Observable<SearchResultApiObject> {
    return this.httpClient.get<SearchResultApiObject>(
      this.baseUrl+'/search/movie?api_key='+this.apiKey+'&query='+searchText);
  }

  public getMovieCredits(movieId: number): Observable<MovieCreditsApiObject> {
    return this.httpClient.get<MovieCreditsApiObject>(this.baseUrl+'/movie/'+movieId+'/credits?api_key='+this.apiKey)
  }

  // private apiObjectToSearchResult(result: SearchResultApiObject) {
  //
  //
  // }
  // private apiObjectToMovieResult(result: MovieApiObject) {
  //
  // }
}
