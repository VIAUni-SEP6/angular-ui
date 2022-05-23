import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  photoURL:string;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.photoURL=this.authService.userData.photoURL;
  }

}
