import { TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('SignUpComponent', () => {
  let signUpComponent: SignUpComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    signUpComponent = new SignUpComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
  });


  it('should create', () => {
    expect(signUpComponent).toBeTruthy();
  });
});
