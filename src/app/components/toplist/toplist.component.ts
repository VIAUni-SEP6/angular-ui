import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {ToplistResultApiObject, BackendService} from "../../shared/services/backend.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss']
})
export class ToplistComponent implements OnInit{
  hasResults = false;
  data: ToplistResultApiObject;
  addToplistGroup: FormGroup;
  deleteToplistGroup: FormGroup;
  toplistID = 'searchText';
  toplistID2 = 'searchText';

  constructor(public backendService: BackendService,public authService:AuthService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  getToplist() {
      this.backendService.getToplist().subscribe((topListResult:ToplistResultApiObject) => {
          if(!!topListResult.data.movieID) {
            this.hasResults = true;
            this.data = topListResult;
          }
        })
    }

    addToplist() {
        this.backendService.addMovieToToplist(
          this.addToplistGroup.get(this.toplistID)?.value).subscribe(() => {

          })
      }

      deleteToplist() {
              this.backendService.deleteMovieFromToplist(
                this.deleteToplistGroup.get(this.toplistID2)?.value).subscribe(() => {

                })
            }

  private buildFormGroup(): void {
    this.addToplistGroup = this.formBuilder.group({
      [this.toplistID]: null
    })
    this.deleteToplistGroup = this.formBuilder.group({
          [this.toplistID2]: null
        })
  }
}
