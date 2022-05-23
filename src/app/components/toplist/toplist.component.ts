import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {ToplistResultApiObject, BackendService} from "../../shared/services/backend.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, map} from "rxjs";
import {MovieSearchApiObject, TmdbService} from "../../shared/services/tmdb.service";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss']
})
export class ToplistComponent implements OnInit{
  hasResults = false;
  data: ToplistResultApiObject;
  addToplistGroup: FormGroup;
  deleteToplistGroup: FormGroup;
  toplistID = 'searchText';
  toplistID2 = 'searchText';
  private dialogRef: MatDialogRef<MovieDetailComponent, MovieSearchApiObject>;
  public moviesOnToplist = new BehaviorSubject<MovieSearchApiObject[] | null>(null)

  constructor(
    public backendService: BackendService,
    public authService:AuthService,
    public formBuilder: FormBuilder,
    public tmdbService: TmdbService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildFormGroup();
    this.backendService.getToplist()
      .pipe(
        map((value:ToplistResultApiObject) => {
          let movies: MovieSearchApiObject[] = [];
          for (let i = 0; i < value.data.movieID.length; i++) {
            this.tmdbService.getMovieById(value.data.movieID[i]).subscribe(value1 => {
              movies.push(value1);
            })
          }
          this.moviesOnToplist.next(movies);
        })).subscribe(() => this.hasResults=true);
  }

  getMoviesOnToplist() {
    return this.moviesOnToplist.getValue();
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
    this.addToplistGroup = this.formBuilder.group({
      [this.toplistID]: null
    })
    this.deleteToplistGroup = this.formBuilder.group({
          [this.toplistID2]: null
        })
  }
}
