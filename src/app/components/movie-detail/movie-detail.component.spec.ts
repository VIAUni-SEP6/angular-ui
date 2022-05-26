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
import {ToplistResultApiObject} from "../../shared/models/backend/ToplistResultApiObject";
import {ToplistApiObject} from "../../shared/models/backend/ToplistApiObject";

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
  const toplist: ToplistApiObject = {
    movieID: []
  }
  const toplistResult: ToplistResultApiObject = {
    data: toplist
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
    backendServiceSpy.getToplist.and.returnValue(of(toplistResult))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(movieDetailComponent).toBeTruthy();
  });
});
