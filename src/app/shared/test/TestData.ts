import {MovieSearchApiObject} from "../models/tmdb/MovieSearchApiObject";
import {CastApiObject} from "../models/tmdb/CastApiObject";
import {CrewApiObject} from "../models/tmdb/CrewApiObject";
import {MovieCreditsApiObject} from "../models/tmdb/MovieCreditsApiObject";
import {SearchResultApiObject} from "../models/tmdb/SearchResultApiObject";
import {ToplistApiObject} from "../models/backend/ToplistApiObject";
import {ToplistResultApiObject} from "../models/backend/ToplistResultApiObject";

export const movieSearch: MovieSearchApiObject[] = [
  {
    poster_path: null,
    adult: false,
    overview: '',
    release_date: '',
    genre_ids: [],
    id: 1,
    original_title: 'Shrek',
    original_language: '',
    title: 'Shrek',
    backdrop_path: null,
    popularity: 5,
    vote_count: 5,
    video: false,
    vote_average: 4
  },
  {
    poster_path: null,
    adult: false,
    overview: '',
    release_date: '',
    genre_ids: [],
    id: 2,
    original_title: 'Shrek 2',
    original_language: '',
    title: 'Shrek 2',
    backdrop_path: null,
    popularity: 5,
    vote_count: 5,
    video: false,
    vote_average: 4
  },
  {
    poster_path: null,
    adult: false,
    overview: '',
    release_date: '',
    genre_ids: [],
    id: 3,
    original_title: 'Shrek 3',
    original_language: '',
    title: 'Shrek 3',
    backdrop_path: null,
    popularity: 5,
    vote_count: 5,
    video: false,
    vote_average: 4
  }
];
function createCastArray(): CastApiObject[] {
  return [
    {
      adult: true,
      gender: 1,
      id: 1,
      known_for_department: '',
      name: 'Scooby',
      original_name: 'Scooby-Doo',
      popularity: 10,
      profile_path: null,
      cast_id: 2,
      character: 'Dog',
      credit_id: '',
      order: 1
    },
    {
      adult: true,
      gender: 0,
      id: 2,
      known_for_department: '',
      name: 'Fred',
      original_name: 'Fred',
      popularity: 10,
      profile_path: null,
      cast_id: 3,
      character: 'Fred',
      credit_id: '',
      order: 1
    },
  ];
}

function createCrewArray(): CrewApiObject[] {
  return [
    {
      adult: false,
      gender: null,
      id: 6,
      known_for_department: '',
      name: 'Harry',
      original_name: 'Harry Potter',
      popularity: 2,
      profile_path: null,
      credit_id: '32',
      job: 'Director'
    },
    {
      adult: false,
      gender: null,
      id: 7,
      known_for_department: '',
      name: 'Hermione',
      original_name: 'Hermione Granger',
      popularity: 2,
      profile_path: null,
      credit_id: '33',
      job: 'Makeup Artist'
    },
    {
      adult: false,
      gender: null,
      id: 8,
      known_for_department: '',
      name: 'Ron',
      original_name: 'Ron Weasley',
      popularity: 2,
      profile_path: null,
      credit_id: '34',
      job: 'Director'
    },
    {
      adult: false,
      gender: null,
      id: 9,
      known_for_department: '',
      name: 'Draco',
      original_name: 'Draco Malfoy',
      popularity: 2,
      profile_path: null,
      credit_id: '35',
      job: 'Actor'
    },
  ];
}

export const movieCredits: MovieCreditsApiObject = {
  id: 1,
  cast: createCastArray(),
  crew: createCrewArray()
}

export const searchResult: SearchResultApiObject = {
  page: 1,
  results: movieSearch,
  total_results: 3,
  total_pages: 1
}

const toplist: ToplistApiObject = {
  movieID: []
}
export const toplistResult: ToplistResultApiObject = {
  data: toplist
}
