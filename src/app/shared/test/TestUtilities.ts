import SpyObj = jasmine.SpyObj;
import {AuthService} from "../services/auth.service";
import createSpyObj = jasmine.createSpyObj;
import {TmdbService} from "../services/tmdb.service";
import {ToplistStore} from "../stores/toplist-store";
import {BackendService} from "../services/backend.service";
import {StatisticsService} from "../services/statistics.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";

export class TestUtilities {
  static createAuthServiceSpy(): SpyObj<AuthService> {
    return createSpyObj<AuthService>('AuthService', ['SignIn', 'SignUp', 'SendVerificationMail', 'ForgotPassword', 'GoogleAuth', 'AuthLogin', 'SetUserData', 'SignOut']);
  }

  static createTmdbServiceSpy(): SpyObj<TmdbService> {
    return createSpyObj<TmdbService>('TmdbService', ['searchMovies','getMovieCredits', 'getMovieById', 'getTopRatedMovies', 'getPopularMovies', 'getUpcomingMovies']);
  }

  static createToplistStoreSpy(): SpyObj<ToplistStore> {
    return createSpyObj<ToplistStore>('ToplistStore', ['refreshToplist', 'getToplistChanges$', 'updateToplist']);
  }

  static createBackendServiceSpy(): SpyObj<BackendService> {
    return createSpyObj<BackendService>('BackendService', ['getToplist', 'addMovieToToplist', 'deleteMovieFromToplist']);
  }

  static createStatisticsServiceSpy(): SpyObj<StatisticsService> {
    return createSpyObj<StatisticsService>('StatisticsService', ['getActors']);
  }

  static createLiveAnnouncerSpy(): SpyObj<LiveAnnouncer> {
    return createSpyObj<LiveAnnouncer>('LiveAnnouncer', ['announce']);
  }
}
