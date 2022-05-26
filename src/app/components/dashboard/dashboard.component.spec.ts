import { TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('DashboardComponent', () => {
  let dashboardComponent: DashboardComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    dashboardComponent = new DashboardComponent(authServiceSpy)
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: [],
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(dashboardComponent).toBeTruthy();
  });
});
