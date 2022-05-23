import {OnInit, Component, HostListener} from '@angular/core';
import {MovieSearchApiObject, SearchResultApiObject, TmdbService} from "../../shared/services/tmdb.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {BehaviorSubject, map, switchMap} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchFormGroup: FormGroup;
  searchTextControlName = 'searchText';
  hasResults = false;
  movies: SearchResultApiObject;
  private isLoading = new BehaviorSubject<boolean>(true);
  private dialogRef: MatDialogRef<MovieDetailComponent, MovieSearchApiObject>;
  private upcomingMovies = new BehaviorSubject<SearchResultApiObject | null>(null)
  private upcomingMoviesCarouselArray= new BehaviorSubject<(MovieSearchApiObject[] | undefined) [] | null>(null) ;
  private popularMovies = new BehaviorSubject<SearchResultApiObject | null>(null)
  private popularMoviesCarouselArray= new BehaviorSubject<(MovieSearchApiObject[] | undefined) [] | null>(null) ;
  private topRatedMovies = new BehaviorSubject<SearchResultApiObject | null>(null)
  private topRatedMoviesCarouselArray= new BehaviorSubject<(MovieSearchApiObject[] | undefined) [] | null>(null) ;

  constructor(public tmdbService: TmdbService, public formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.buildFormGroup();
    this.tmdbService.getUpcomingMovies()
      .pipe(
        switchMap((value: SearchResultApiObject) => {
          this.upcomingMovies.next(value);
          this.upcomingMoviesCarouselArray.next(this.createUpcomingMoviesCarousel());
          return this.tmdbService.getPopularMovies();
        }),
        switchMap((value: SearchResultApiObject) => {
          this.popularMovies.next(value);
          this.popularMoviesCarouselArray.next(this.createPopularMoviesCarousel());
          return this.tmdbService.getTopRatedMovies();
        }),
        map((value: SearchResultApiObject) => {
          this.topRatedMovies.next(value);
          this.topRatedMoviesCarouselArray.next(this.createTopRatedMoviesCarousel());
        })
        ).subscribe(() => this.isLoading.next(false));
  }

  @HostListener('keydown.enter')
  public onEnter(): void {
    this.searchMovies();
  }

  searchMovies() {
    this.tmdbService.searchMovies(
      this.searchFormGroup.get(this.searchTextControlName)?.value).subscribe((searchResult: SearchResultApiObject) => {
      this.hasResults = true;
      this.movies = searchResult;
    })
  }

  openMovieDetails(movie: MovieSearchApiObject) {
    this.dialogRef = this.dialog.open(MovieDetailComponent, {
      autoFocus: false,
      data: movie,
      width: '900px',
      height: '625px'
    });

  }

  private buildFormGroup(): void {
    this.searchFormGroup = this.formBuilder.group({
      [this.searchTextControlName]: null
    })
  }

  getUpcomingMovies() {
    return this.upcomingMovies.getValue();
  }

  getPopularMovies() {
    return this.popularMovies.getValue();
  }

  getTopRatedMovies() {
    return this.topRatedMovies.getValue();
  }

  private createUpcomingMoviesCarousel(): (MovieSearchApiObject[] | undefined) [] {
    const array =[];
    if (this.getUpcomingMovies()?.results) {
      // @ts-ignore
      for (let i = 0; i < this.getUpcomingMovies()?.results.length; i += 6) {
        const chunk = this.getUpcomingMovies()?.results.slice(i, i + 6);
        array.push(chunk);
      }
    }
    return array;
  }

  private createPopularMoviesCarousel(): (MovieSearchApiObject[] | undefined) [] {
    const array =[];
    if (this.getPopularMovies()?.results) {
      // @ts-ignore
      for (let i = 0; i < this.getPopularMovies()?.results.length; i += 6) {
        const chunk = this.getPopularMovies()?.results.slice(i, i + 6);
        array.push(chunk);
      }
    }
    return array;
  }

  private createTopRatedMoviesCarousel(): (MovieSearchApiObject[] | undefined) [] {
    const array =[];
    if (this.getTopRatedMovies()?.results) {
      // @ts-ignore
      for (let i = 0; i < this.getTopRatedMovies()?.results.length; i += 6) {
        const chunk = this.getTopRatedMovies()?.results.slice(i, i + 6);
        array.push(chunk);
      }
    }
    return array;
  }

  getPopularMoviesCarouselArray() {
    return this.popularMoviesCarouselArray.getValue();
  }

  getUpcomingMoviesCarouselArray() {
    return this.upcomingMoviesCarouselArray.getValue();
  }

  getTopRatedMoviesCarouselArray() {
    return this.topRatedMoviesCarouselArray.getValue();
  }

  isLoadingValue() {
    return this.isLoading.getValue();
  }

  reset() {
    this.hasResults = false;
    this.searchFormGroup.get(this.searchTextControlName)?.patchValue('');
  }
}
