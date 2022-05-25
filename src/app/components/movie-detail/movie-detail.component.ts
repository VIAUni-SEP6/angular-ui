import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  TmdbService
} from "../../shared/services/tmdb.service";
import {BehaviorSubject, map, Subject, switchMap, takeUntil} from "rxjs";
import {BackendService} from "../../shared/services/backend.service";
import {ToplistStore} from "../../shared/stores/toplist-store";
import {MovieCreditsApiObject} from "../../shared/models/tmdb/MovieCreditsApiObject";
import {CastApiObject} from "../../shared/models/tmdb/CastApiObject";
import {MovieSearchApiObject} from "../../shared/models/tmdb/MovieSearchApiObject";
import {ToplistResultApiObject} from "../../shared/models/backend/ToplistResultApiObject";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();
  private isMovieOnToplist = new BehaviorSubject<boolean>(false);
  private movieCredits = new BehaviorSubject<MovieCreditsApiObject | null>(null);
  private isLoading = new BehaviorSubject<boolean>(true);
  private carouselArray = new BehaviorSubject<(CastApiObject[] | undefined) [] | null>(null);


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovieSearchApiObject,
    private mdDialogRef: MatDialogRef<MovieDetailComponent, MovieSearchApiObject>,
    private backendService: BackendService,
    public tmdbService: TmdbService,
    private toplistStore: ToplistStore) {
  }

  ngOnInit(): void {
    this.backendService.getToplist().pipe(
      takeUntil(this.onDestroy$),
      switchMap((toplistResult: ToplistResultApiObject) => {
        this.isMovieOnToplist.next(toplistResult.data.movieID.some(movieId => movieId.toString() === this.data.id.toString()));
        return this.tmdbService.getMovieCredits(this.data.id);
      }),
      map((movieCredits: MovieCreditsApiObject) => {
        this.movieCredits.next(movieCredits);
        this.carouselArray.next(this.createCarouselArray());
      })
    ).subscribe(() => this.isLoading.next(false));


  }

  createCarouselArray(): (CastApiObject[] | undefined) [] {
    const array = [];
    if (this.getMovieCredits()?.cast) {
      // @ts-ignore
      for (let i = 0; i < this.getMovieCredits()?.cast.length; i += 5) {
        const chunk = this.getMovieCredits()?.cast.slice(i, i + 5);
        array.push(chunk);
      }
    }
    return array;
  }

  getDirectors() {
    const directors = this.getMovieCredits()?.crew.filter(value => value.job === 'Director');
    let result = ''
    if (directors) {
      for (let i = 0; i < directors.length; i++) {
        if (i === directors.length - 1) {
          result += directors[i].name;
        } else {
          result += directors[i].name + ', ';
        }
      }
    }
    return result;
  }

  public close(): void {
    this.mdDialogRef.close();
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close();
  }

  addToToplist() {
    this.backendService.addMovieToToplist(this.data.id.toString()).subscribe(() => {
      this.toplistStore.refreshToplist();
    });
    this.isMovieOnToplist.next(true);
  }

  deleteFromToplist() {
    this.backendService.deleteMovieFromToplist(this.data.id.toString()).subscribe(() => {
      this.toplistStore.refreshToplist();
    });
    this.isMovieOnToplist.next(false);
  }

  isMovieOnToplistValue() {
    return this.isMovieOnToplist.getValue();
  }

  getMovieCredits() {
    return this.movieCredits.getValue();
  }

  isLoadingValue() {
    return this.isLoading.getValue();
  }

  getCarouselArray() {
    return this.carouselArray.getValue();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }
}
