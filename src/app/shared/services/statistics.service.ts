import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ActorStatisticsResultApiObject} from "../models/statistics/ActorStatisticsResultApiObject";

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
