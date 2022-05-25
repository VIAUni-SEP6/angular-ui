import {CastApiObject} from "./CastApiObject";
import {CrewApiObject} from "./CrewApiObject";

export interface MovieCreditsApiObject {
  id: number,
  cast: CastApiObject[],
  crew: CrewApiObject[],
}
