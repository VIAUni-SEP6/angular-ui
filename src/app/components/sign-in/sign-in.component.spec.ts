import { TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('SignInComponent', () => {
  let signInComponent: SignInComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    signInComponent = new SignInComponent(authServiceSpy)
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
  });


  it('should create', () => {
    expect(signInComponent).toBeTruthy();
  });
});
