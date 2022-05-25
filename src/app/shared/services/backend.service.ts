import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {ToplistResultApiObject} from "../models/backend/ToplistResultApiObject";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public baseUrl = 'https://us-central1-sep6-database.cloudfunctions.net/expressApi/';
  constructor(private httpClient: HttpClient, public authService:AuthService) { }

  public getToplist(): Observable<ToplistResultApiObject>{
    let url = this.baseUrl + 'getFavouriteMovies';
    let token = this.authService.userIdToken;
    return this.httpClient.get<ToplistResultApiObject>(url,{ headers: {"Authorization" : `Bearer ${token}`}});
  }

  public addMovieToToplist(movieId: string): Observable<any> {
      let url = this.baseUrl+'addFavouriteMovie'+'/'+movieId.valueOf();
      let token = this.authService.userIdToken;
      const headers = {"Authorization" : `Bearer ${token}`};
      return this.httpClient.get<any>(url, { headers});
    }

    public deleteMovieFromToplist(movieId: string): Observable<any> {
          let url = this.baseUrl+'deleteFavouriteMovie'+'/'+movieId.valueOf();
          let token = this.authService.userIdToken;
          const headers = {"Authorization" : `Bearer ${token}`};
          return this.httpClient.get<any>(url, { headers});
        }
}
