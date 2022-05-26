import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject, switchMap} from "rxjs";
import {TmdbService} from "../services/tmdb.service";
import {BackendService} from "../services/backend.service";
import {MovieSearchApiObject} from "../models/tmdb/MovieSearchApiObject";
import {ToplistResultApiObject} from "../models/backend/ToplistResultApiObject";

@Injectable({
  providedIn: 'root'
})
export class ToplistStore {
  private toplistSource = new BehaviorSubject<MovieSearchApiObject[] | null>(null);
  private toplistChanges$ = this.toplistSource.asObservable();
  private refresh = new Subject();

  constructor(private backendService: BackendService, private tmdbService: TmdbService) {
    this.refresh
      .pipe(
        switchMap(() => {
          return this.backendService.getToplist()
        }))
      .subscribe((moviesFromBackend: ToplistResultApiObject) => {
        let movies: MovieSearchApiObject[] = [];
        for (let i = 0; i < moviesFromBackend.data.movieID.length; i++) {
          this.tmdbService.getMovieById(moviesFromBackend.data.movieID[i]).subscribe(value1 => {
            movies.push(value1);
          })
        }
        this.updateToplist(movies);
      })
  }

  public refreshToplist() {
    this.refresh.next('');
  }

  getToplistChanges$() {
    return this.toplistChanges$;
  }

  updateToplist(toplist: MovieSearchApiObject[]): void {
    this.toplistSource.next(toplist);
  }


}
