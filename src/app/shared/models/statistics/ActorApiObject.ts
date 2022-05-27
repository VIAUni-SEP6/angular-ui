import {MoviePlayedApiObject} from "./MoviePlayedApiObject";

export interface ActorApiObject {
  profile_path: string | null,
  adult: boolean,
  id: number,
  known_for: MoviePlayedApiObject[],
  name: string,
  popularity: number
  average_movie_rating: number
}
