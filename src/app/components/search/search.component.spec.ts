import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {FormBuilder} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {TestUtilities} from "../../shared/test/TestUtilities";
import {of} from "rxjs";
import {TmdbService} from "../../shared/services/tmdb.service";
import {movieSearch, searchResult} from "../../shared/test/TestData";

describe('SearchComponent', () => {
  let searchComponent: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const tmdbServiceSpy = TestUtilities.createTmdbServiceSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {provide: TmdbService, useValue: tmdbServiceSpy},
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {

    fixture = TestBed.createComponent(SearchComponent);
    searchComponent = fixture.componentInstance;
    tmdbServiceSpy.getPopularMovies.and.returnValue(of(searchResult));
    tmdbServiceSpy.getUpcomingMovies.and.returnValue(of(searchResult));
    tmdbServiceSpy.getTopRatedMovies.and.returnValue(of(searchResult));
    tmdbServiceSpy.searchMovies.and.returnValue(of(searchResult));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(searchComponent).toBeTruthy();
  });

  it('should return searchResult when calling getPopularMovies', () => {
    expect(searchComponent.getPopularMovies()).toEqual(searchResult);
  });

  it('should return searchResult when calling getUpcomingMovies', () => {
    expect(searchComponent.getUpcomingMovies()).toEqual(searchResult);
  });

  it('should return searchResult when calling getTopRatedMovies', () => {
    expect(searchComponent.getTopRatedMovies()).toEqual(searchResult);
  });
  it('should return false when searchMovies has not been called', () => {
    expect(searchComponent.hasResults).toBe(false);
  });
  it('should return true when searchMovies has been called', () => {
    searchComponent.searchMovies();
    expect(searchComponent.hasResults).toBe(true);
  });
  it('movies should be falsy when searchMovies has been called', () => {
    expect(searchComponent.movies).toBeFalsy();
  });
  it('movies should equal to searchResult when searchMovies has been called', () => {
    searchComponent.searchMovies();
    expect(searchComponent.movies).toEqual(searchResult);
  });
  it('openMovieDetails() should open dialog', () => {
    const openDialogSpy = spyOn(searchComponent.dialog, 'open');
    searchComponent.openMovieDetails(movieSearch[0]);
    expect(openDialogSpy).toHaveBeenCalled();
  });
  it('dialog should not be opened when not calling openMovieDetails()', () => {
    const openDialogSpy = spyOn(searchComponent.dialog, 'open');
    expect(openDialogSpy).not.toHaveBeenCalled();
  });
});
