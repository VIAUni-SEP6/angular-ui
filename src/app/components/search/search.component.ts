import {OnInit, Component} from '@angular/core';
import {MovieApiObject, SearchResultApiObject, TmdbService} from "../../shared/services/tmdb.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";

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
  private dialogRef: MatDialogRef<MovieDetailComponent, MovieApiObject>;

  constructor(public tmdbService: TmdbService, public formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  searchMovies() {
    this.tmdbService.searchMovies(
      this.searchFormGroup.get(this.searchTextControlName)?.value).subscribe((searchResult: SearchResultApiObject) => {
      this.hasResults = true;
      this.movies = searchResult;
    })
  }

  openMovieDetails(movie: MovieApiObject) {
    this.dialogRef = this.dialog.open(MovieDetailComponent, {
      autoFocus: false,
      data: movie,
      width: '900px',
      height: '700px'
    });

  }

  private buildFormGroup(): void {
    this.searchFormGroup = this.formBuilder.group({
      [this.searchTextControlName]: null
    })
  }
}
