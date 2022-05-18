import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CastApiObject, MovieApiObject, MovieCreditsApiObject, TmdbService} from "../../shared/services/tmdb.service";
import {BehaviorSubject, map, Subject, switchMap, takeUntil} from "rxjs";
import {BackendService, ToplistResultApiObject} from "../../shared/services/backend.service";

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
  private carouselArray= new BehaviorSubject<(CastApiObject[] | undefined) [] | null>(null) ;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovieApiObject,
    private mdDialogRef: MatDialogRef<MovieDetailComponent, MovieApiObject>,
    private topListService: BackendService,
    public tmdbService: TmdbService) {

  }

  ngOnInit(): void {
    this.topListService.getToplist().pipe(
      takeUntil(this.onDestroy$),
      switchMap((toplistResult: ToplistResultApiObject) => {
        this.isMovieOnToplist.next(toplistResult.data.movieID.some(movieId => movieId.toString() === this.data.id.toString()));
        return this.tmdbService.getMovieCredits(this.data.id);
      }),
      map((movieCredits: MovieCreditsApiObject) => {
        this.movieCredits.next(movieCredits);
        this.carouselArray.next(this.createCarouselArray());
      })
    ).subscribe(() => {
      this.isLoading.next(false);
    });

  }

  createCarouselArray(): (CastApiObject[] | undefined) []{
    const array =[];
    if (this.getMovieCredits()?.cast) {
      // @ts-ignore
      for (let i = 0; i < this.getMovieCredits()?.cast.length; i += 5) {
        const chunk = this.getMovieCredits()?.cast.slice(i, i + 5);
        array.push(chunk);
      }
    }
    console.log(array)
    return array;
  }

/*  getTopList() {
    this.topListService.getToplist().pipe(takeUntil(this.onDestroy$)).subscribe((toplistResult: ToplistResultApiObject) => {
      this.isMovieOnToplist.next(toplistResult.data.movieID.some(movieId => movieId.toString() === this.data.id.toString()));
      this.isLoading.next(false);
    });
  }

  getMovieCredits() {
    this.tmdbService.getMovieCredits(this.data.id).subscribe((value: MovieCreditsApiObject) => {

    })
  }*/

  public close(): void {
    this.mdDialogRef.close();
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }

  addToToplist() {
    this.topListService.addMovieToToplist(this.data.id.toString()).subscribe(() => {
    });
    this.isMovieOnToplist.next(true);
  }

  deleteFromToplist() {
    this.topListService.deleteMovieFromToplist(this.data.id.toString()).subscribe(() => {
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
}
