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
      this.backendService.getToplist().subscribe((value) => {
          this.hasResults=true;
          this.data = value;
        })
    }

    addToplist() {
        this.backendService.addToplist(
          this.addToplistGroup.get(this.toplistID)?.value).subscribe((value) => {

          })
      }

      deleteToplist() {
              this.backendService.deleteToplist(
                this.deleteToplistGroup.get(this.toplistID2)?.value).subscribe((value) => {

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
