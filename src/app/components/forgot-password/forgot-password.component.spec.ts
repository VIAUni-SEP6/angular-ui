import { TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('ForgotPasswordComponent', () => {
  let forgotPasswordComponent: ForgotPasswordComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    forgotPasswordComponent = new ForgotPasswordComponent(authServiceSpy)
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(forgotPasswordComponent).toBeTruthy();
  });
});
