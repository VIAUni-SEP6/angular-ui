import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('DashboardComponent', () => {
  let dashboardComponent: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    dashboardComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dashboardComponent).toBeTruthy();
  });
  it('should set content', () => {
    dashboardComponent.setContent('new content');
    expect(dashboardComponent.getContent()).toEqual('new content');
  });
});
