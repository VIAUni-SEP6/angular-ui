import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SearchResultApiObject} from "../models/tmdb/SearchResultApiObject";
import {MovieCreditsApiObject} from "../models/tmdb/MovieCreditsApiObject";
import {MovieSearchApiObject} from "../models/tmdb/MovieSearchApiObject";

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
  public getMovieById(movieId: number): Observable<MovieSearchApiObject> {
    return this.httpClient.get<MovieSearchApiObject>(this.baseUrl+'/movie/'+movieId+'?api_key='+this.apiKey)
  }

  public getTopRatedMovies(): Observable<SearchResultApiObject> {
    return this.httpClient.get<SearchResultApiObject>(this.baseUrl+'/movie/top_rated?api_key='+this.apiKey)
  }

  public getPopularMovies(): Observable<SearchResultApiObject> {
    return this.httpClient.get<SearchResultApiObject>(this.baseUrl+'/movie/popular?api_key='+this.apiKey)
  }

  public getUpcomingMovies(): Observable<SearchResultApiObject> {
    return this.httpClient.get<SearchResultApiObject>(this.baseUrl+'/movie/upcoming?api_key='+this.apiKey)
  }
}
