import {OnInit, Component} from '@angular/core';
import {SearchResultApiObject, TmdbService} from "../../shared/services/tmdb.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchFormGroup: FormGroup;
  searchTextControlName = 'searchText';
  hasResults = false;
  movies: SearchResultApiObject;

  constructor(public tmdbService: TmdbService,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  searchMovies() {
    this.tmdbService.searchMovies(
      this.searchFormGroup.get(this.searchTextControlName)?.value).subscribe((value) => {
        this.hasResults=true;
        this.movies = value;
      })
  }

  private buildFormGroup(): void {
    this.searchFormGroup = this.formBuilder.group({
      [this.searchTextControlName]: null
    })
  }
}
