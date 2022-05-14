import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

export interface ToplistResultApiObject {
  data: ToplistApiObject
}

export interface ToplistApiObject {
  movieID: number[]
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public baseUrl = 'https://us-central1-sep6-database.cloudfunctions.net/expressApi/';
  private apiKey = '1629f55fe2e85b91bf3b83337f2a7291';

  constructor(private httpClient: HttpClient, public authService:AuthService) { }

  public getToplist(): Observable<any>{
    let url = this.baseUrl + 'getFavouriteMovies';
    let token = this.authService.userIdToken;
    return this.httpClient.get<ToplistResultApiObject>(url,{ headers: {"Authorization" : `Bearer ${token}`}});
  }

  public addToplist(toplistID: string): Observable<any> {
      let url = this.baseUrl+'addFavouriteMovie'+'/'+toplistID.valueOf();
      let token = this.authService.userIdToken;
      const headers = {"Authorization" : `Bearer ${token}`};
      return this.httpClient.get<any>(url, { headers});
    }

    public deleteToplist(toplistID2: string): Observable<any> {
          let url = this.baseUrl+'deleteFavouriteMovie'+'/'+toplistID2.valueOf();
          let token = this.authService.userIdToken;
          const headers = {"Authorization" : `Bearer ${token}`};
          return this.httpClient.get<any>(url, { headers});
        }


  // private apiObjectToSearchResult(result: SearchResultApiObject) {
  //
  //
  // }
  // private apiObjectToMovieResult(result: MovieApiObject) {
  //
  // }
}
