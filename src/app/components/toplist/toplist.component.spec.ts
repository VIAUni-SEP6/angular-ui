import {ComponentFixture, TestBed} from '@angular/core/testing';

import { ToplistComponent } from './toplist.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {FormBuilder} from "@angular/forms";
import {ToplistStore} from "../../shared/stores/toplist-store";
import {TmdbService} from "../../shared/services/tmdb.service";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialogModule} from "@angular/material/dialog";
import {of} from "rxjs";
import {movieCredits, movieSearch} from "../../shared/test/TestData";

describe('ToplistComponent', () => {
  const authServiceSpy = TestUtilities.createAuthServiceSpy();
  const tmdbServiceSpy = TestUtilities.createTmdbServiceSpy();
  const toplistStoreSpy = TestUtilities.createToplistStoreSpy();

  let toplistComponent: ToplistComponent;
  let fixture: ComponentFixture<ToplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {provide: ToplistStore, useValue: toplistStoreSpy},
        {provide: TmdbService, useValue: tmdbServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        FormBuilder
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToplistComponent);
    toplistComponent = fixture.componentInstance;
    tmdbServiceSpy.getMovieCredits.and.returnValue(of(movieCredits));
    toplistStoreSpy.getToplistChanges$.and.returnValue(of(movieSearch));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(toplistComponent).toBeTruthy();
  });

  it('isLoading should be false after initializing', () => {
    expect(toplistComponent.isLoadingValue()).toBe(false);
  });
  it('moviesOnToplist should have the value of movieSearch after initializing', () => {
    expect(toplistComponent.moviesOnToplist.getValue()).toEqual(movieSearch);
  });
  it('openMovieDetails() should open dialog', () => {
    const openDialogSpy = spyOn(toplistComponent.dialog, 'open');
    toplistComponent.openMovieDetails(movieSearch[0]);
    expect(openDialogSpy).toHaveBeenCalled();
  });
  it('dialog should not be opened when not calling openMovieDetails()', () => {
    const openDialogSpy = spyOn(toplistComponent.dialog, 'open');
    expect(openDialogSpy).not.toHaveBeenCalled();
  });
});
