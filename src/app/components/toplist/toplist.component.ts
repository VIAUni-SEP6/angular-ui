import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder} from "@angular/forms";
import {BehaviorSubject, map, Subject, takeUntil} from "rxjs";
import {TmdbService} from "../../shared/services/tmdb.service";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToplistStore} from "../../shared/stores/toplist-store";
import {MovieSearchApiObject} from "../../shared/models/tmdb/MovieSearchApiObject";
import {ToplistResultApiObject} from "../../shared/models/backend/ToplistResultApiObject";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss']
})
export class ToplistComponent implements OnInit, OnDestroy {
  hasResults: boolean;
  data: ToplistResultApiObject;
  private dialogRef: MatDialogRef<MovieDetailComponent, MovieSearchApiObject>;
  public moviesOnToplist = new BehaviorSubject<MovieSearchApiObject[]>([]);
  private onDestroy$ = new Subject();
  public movies: MovieSearchApiObject[];

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public tmdbService: TmdbService,
    private dialog: MatDialog,
    private toplistStore: ToplistStore) {
  }

  ngOnInit(): void {
    this.toplistStore.getToplistChanges$()
      .pipe(
        takeUntil(this.onDestroy$),
        map((moviesFromStore: MovieSearchApiObject[] | null) => {
          if (moviesFromStore === null) {
            this.toplistStore.refreshToplist();
          } else {
            this.moviesOnToplist.next(moviesFromStore);
          }
        }),
      )
      .subscribe(() => this.hasResults = true);

  }

  openMovieDetails(movie: MovieSearchApiObject) {
    this.dialogRef = this.dialog.open(MovieDetailComponent, {
      autoFocus: false,
      data: movie,
      width: '900px',
      height: '625px'
    });

  }

  ngOnDestroy(): void {
    this.hasResults = false;
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }
}
