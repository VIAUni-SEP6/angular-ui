import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import {ActorStatisticsResultApiObject} from "../../shared/models/statistics/ActorStatisticsResultApiObject";
import {StatisticsService} from "../../shared/services/statistics.service";

export interface PeriodicElement {
  name: string;
  popularity: number;
  average_movie_rating: number;
}

@Component({
  selector: 'app-actorStatistics',
  templateUrl: './actorStatistics.component.html',
  styleUrls: ['./actorStatistics.component.scss']
})
export class ActorStatisticsComponent implements AfterViewInit, OnInit{
  ELEMENT_DATA: PeriodicElement[] = [];
  data : ActorStatisticsResultApiObject;
  displayedColumns: string[] = ['name', 'popularity', 'average_movie_rating'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public statisticsService: StatisticsService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

  }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

  ngOnInit(): void {
      this.getActorStatistics();
  }

  createTable(){
      for(let k = 0; k < (this.data.results).length; k++){
        let temporary = {} as PeriodicElement;
        temporary.name = this.data.results[k].name;
        temporary.popularity = this.data.results[k].popularity;
        temporary.average_movie_rating = this.data.results[k].average_movie_rating;
        this.ELEMENT_DATA.push(temporary);
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  getActorStatistics() {
      this.ELEMENT_DATA = [];
      this.statisticsService.getActors().subscribe((value: ActorStatisticsResultApiObject) => {
          for (let i = 0; i < (value.results).length; i++) {
            var movie_average = 0;
            for(let j = 0; j < (value.results[i].known_for).length; j++){
              movie_average += (value.results[i].known_for[j]).vote_average;
            }
            movie_average = movie_average/(value.results[i].known_for).length;
            value.results[i].average_movie_rating = movie_average;
          }
          this.data = value;
          this.createTable();
        })
    }
}



