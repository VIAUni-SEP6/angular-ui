import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public currentContent: BehaviorSubject<string> = new BehaviorSubject<string>('search');
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

  setContent(newContent: string) {
    this.currentContent.next(newContent);
  }

  getContent(){
    return this.currentContent.getValue();
  }
}
