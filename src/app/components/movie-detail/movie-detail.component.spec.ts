import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieDetailComponent} from './movie-detail.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestUtilities} from "../../shared/test/TestUtilities";
import createSpyObj = jasmine.createSpyObj;
import {MovieSearchApiObject} from "../../shared/models/tmdb/MovieSearchApiObject";
import {ToplistStore} from "../../shared/stores/toplist-store";
import {TmdbService} from "../../shared/services/tmdb.service";
import {BackendService} from "../../shared/services/backend.service";
import {of} from "rxjs";
import {movieCredits, toplistResult} from "../../shared/test/TestData";

describe('MovieDetailComponent', () => {
  let movieDetailComponent: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const toplistStoreSpy = TestUtilities.createToplistStoreSpy();
  const tmdbServiceSpy = TestUtilities.createTmdbServiceSpy();
  const backendServiceSpy = TestUtilities.createBackendServiceSpy();
  let dialogRef;
  const dialogData: MovieSearchApiObject = {
    poster_path: '',
    adult: true,
    overview: '',
    release_date: '',
    genre_ids: [],
    id: 1,
    original_title: '',
    original_language: '',
    title: '',
    backdrop_path: '',
    popularity: 10,
    vote_count: 5,
    video: false,
    vote_average: 6
  }



  beforeEach(async () => {
    dialogRef = createSpyObj('MatDialogRef', ['close'])
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [
        {provide: ToplistStore, useValue: toplistStoreSpy},
        {provide: TmdbService, useValue: tmdbServiceSpy},
        {provide: BackendService, useValue: backendServiceSpy},
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    movieDetailComponent = fixture.componentInstance;
    backendServiceSpy.getToplist.and.returnValue(of(toplistResult));
    tmdbServiceSpy.getMovieCredits.and.returnValue(of(movieCredits));
    backendServiceSpy.addMovieToToplist.and.returnValue(of(''));
    backendServiceSpy.deleteMovieFromToplist.and.returnValue(of(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(movieDetailComponent).toBeTruthy();
  });

  it('getMovieCredits should equal movieCredits', () => {
    expect(movieDetailComponent.getMovieCredits()).toEqual(movieCredits);
  });
  it('should return directors only', () => {
    expect(movieDetailComponent.getDirectors()).toEqual('Harry, Ron');
  });

  it('should return false as initial value for isMovieOnToplist', () => {
    expect(movieDetailComponent.isMovieOnToplistValue()).toEqual(false);
  });
  it('should return true after calling addToToplist', () => {
    movieDetailComponent.addToToplist();
    expect(movieDetailComponent.isMovieOnToplistValue()).toEqual(true);
  });
  it('should return false after calling deleteFromToplist', () => {
    movieDetailComponent.deleteFromToplist();
    expect(movieDetailComponent.isMovieOnToplistValue()).toEqual(false);
  });
});
