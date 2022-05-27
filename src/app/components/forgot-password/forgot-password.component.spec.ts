import {ComponentFixture, TestBed} from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('ForgotPasswordComponent', () => {
  let forgotPasswordComponent: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    forgotPasswordComponent = new ForgotPasswordComponent(authServiceSpy)
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    forgotPasswordComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(forgotPasswordComponent).toBeTruthy();
  });
});
