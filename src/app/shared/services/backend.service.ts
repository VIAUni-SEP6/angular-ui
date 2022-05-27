import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map, Subject, switchMap} from 'rxjs';
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
    let resultTest:any;
    this.authService.GetIdToken()
    .pipe(
    switchMap((idToken:any) => {
    return this.httpClient.get<ToplistResultApiObject>(url, {headers: {"Authorization" : 'Bearer ${idToken}'}});
    }),
    ).subscribe((result:any) => {resultTest = result});
    return resultTest;
  }

  public addMovieToToplist(movieId: string): Observable<any> {
      let url = this.baseUrl+'addFavouriteMovie'+'/'+movieId.valueOf();
      this.authService.GetIdToken();
      let token = this.authService.userIdToken;
      const headers = {"Authorization" : `Bearer ${token}`};
      return this.httpClient.get<any>(url, { headers});
    }

    public deleteMovieFromToplist(movieId: string): Observable<any> {
          let url = this.baseUrl+'deleteFavouriteMovie'+'/'+movieId.valueOf();
          this.authService.GetIdToken();
          let token = this.authService.userIdToken;
          const headers = {"Authorization" : `Bearer ${token}`};
          return this.httpClient.get<any>(url, { headers});
        }
}
