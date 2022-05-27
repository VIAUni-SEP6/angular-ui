import {ActorApiObject} from "./ActorApiObject";

export interface ActorStatisticsResultApiObject {
  page: number,
  results: ActorApiObject[],
  total_results: number,
  total_pages: number
}
