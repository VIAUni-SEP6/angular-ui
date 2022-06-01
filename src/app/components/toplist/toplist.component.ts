import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import {TmdbService} from "../../shared/services/tmdb.service";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToplistStore} from "../../shared/stores/toplist-store";
import {MovieSearchApiObject} from "../../shared/models/tmdb/MovieSearchApiObject";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss']
})
export class ToplistComponent implements OnInit, OnDestroy {
  hasResults = false;
  dialogRef: MatDialogRef<MovieDetailComponent, MovieSearchApiObject>;
  public moviesOnToplist = new BehaviorSubject<MovieSearchApiObject[]>([]);
  private isLoading = new BehaviorSubject<boolean>(true);
  private onDestroy$ = new Subject();

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public tmdbService: TmdbService,
    public dialog: MatDialog,
    private toplistStore: ToplistStore) {
  }

  ngOnInit(): void {
    this.toplistStore.getToplistChanges$()
      .subscribe((moviesFromStore: MovieSearchApiObject[] | null) => {
        if (moviesFromStore === null) {
          this.toplistStore.refreshToplist();
        } else {
          this.moviesOnToplist.next(moviesFromStore);
          this.isLoading.next(false)
        }
      });
  }

  openMovieDetails(movie: MovieSearchApiObject) {
    this.dialogRef = this.dialog.open(MovieDetailComponent, {
      autoFocus: false,
      data: movie,
      width: '900px',
      height: '625px'
    });
  }

  isLoadingValue() {
    return this.isLoading.getValue();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }
}
