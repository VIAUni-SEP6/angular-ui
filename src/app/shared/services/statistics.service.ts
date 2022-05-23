import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

export interface ActorStatisticsResultApiObject {
  page: number,
  results: ActorApiObject[],
  total_results: number,
  total_pages: number
}

export interface ActorApiObject {
  profile_path: string | null,
  adult: boolean,
  id: number,
  known_for: MoviePlayedApiObject[],
  name: string,
  popularity: number
  average_movie_rating: number
}

export interface MoviePlayedApiObject {
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string,
  original_title: string,
  genre_ids: number[],
  id: number,
  media_type: string,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number
}
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '1629f55fe2e85b91bf3b83337f2a7291';

  constructor(private httpClient: HttpClient) { }

  public getActors(): Observable<any> {
    return this.httpClient.get<ActorStatisticsResultApiObject>(
     this.baseUrl+'/person/popular?api_key='+this.apiKey);
  }
}
